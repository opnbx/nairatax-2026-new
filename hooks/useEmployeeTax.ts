import { useMemo } from 'react';
import { calculateProgressiveTax, sanitizeNumberInput } from '@/lib/tax-utils';

export interface EmployeeCalculationResult {
  grossAnnual: number;
  grossMonthly: number;
  pension: number;
  nhf: number;
  nhis: number;
  lifeInsurance: number;
  rentRelief: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  effectiveRate: number;
}

interface UseEmployeeTaxProps {
  grossSalary: string;
  frequency: 'monthly' | 'annual';
  annualRent: string;
  lifeInsurance: string;
}

export const useEmployeeTax = ({
  grossSalary,
  frequency,
  annualRent,
  lifeInsurance,
}: UseEmployeeTaxProps): EmployeeCalculationResult | null => {
  return useMemo(() => {
    const gross = sanitizeNumberInput(grossSalary);
    if (gross <= 0) {
      return null;
    }

    // Convert to annual
    const grossAnnual = frequency === 'monthly' ? gross * 12 : gross;
    const grossMonthly = frequency === 'monthly' ? gross : gross / 12;

    // Calculate mandatory deductions
    const pension = Math.round(grossAnnual * 0.08); // 8% pension
    const nhf = Math.round(grossAnnual * 0.025); // 2.5% NHF
    const nhis = Math.min(Math.round(grossAnnual * 0.05), 25000); // 5% NHIS, capped at ₦25K

    // Calculate optional deductions
    const rent = sanitizeNumberInput(annualRent);
    const rentRelief = Math.min(Math.round(rent * 0.2), 500000); // 20% rent relief, max ₦500K

    const lifeInsuranceInput = sanitizeNumberInput(lifeInsurance);
    const lifeInsuranceCap = Math.round(grossAnnual * 0.2); // Max 20% of gross income
    const lifeInsuranceAmount = Math.min(lifeInsuranceInput, lifeInsuranceCap);

    // Total deductions (used to reduce taxable income)
    const totalDeductions = pension + nhf + nhis + rentRelief + lifeInsuranceAmount;

    // Taxable income = gross - all deductions
    const taxableIncome = Math.max(0, grossAnnual - totalDeductions);

    // Calculate progressive tax on taxable income
    const totalTax = calculateProgressiveTax(taxableIncome);

    // Net income = gross - mandatory deductions - tax
    // Note: Rent relief and life insurance reduce taxable income but aren't "taken out" of paycheck
    const netAnnual = grossAnnual - pension - nhf - nhis - totalTax;
    const netMonthly = Math.round(netAnnual / 12);

    // Effective tax rate
    const effectiveRate = grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0;

    return {
      grossAnnual,
      grossMonthly: Math.round(grossMonthly),
      pension,
      nhf,
      nhis,
      lifeInsurance: lifeInsuranceAmount,
      rentRelief,
      totalDeductions,
      taxableIncome,
      totalTax,
      netAnnual,
      netMonthly,
      effectiveRate,
    };
  }, [grossSalary, frequency, annualRent, lifeInsurance]);
};