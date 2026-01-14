'use client';

import { useState, useEffect } from 'react';

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 800000, rate: 0 },
  { min: 800000, max: 1600000, rate: 0.07 },
  { min: 1600000, max: 3000000, rate: 0.11 },
  { min: 3000000, max: 7000000, rate: 0.15 },
  { min: 7000000, max: 15000000, rate: 0.19 },
  { min: 15000000, max: 25000000, rate: 0.21 },
  { min: 25000000, max: null, rate: 0.25 },
];

interface CalculationResult {
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

export function EmployeeCalculator() {
  const [grossSalary, setGrossSalary] = useState('800000');
  const [frequency, setFrequency] = useState<'monthly' | 'annual'>('annual');
  const [annualRent, setAnnualRent] = useState('');
  const [lifeInsurance, setLifeInsurance] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateTax = (taxableIncome: number): number => {
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome <= 0) break;

      const bracketMin = bracket.min;
      const bracketMax = bracket.max ?? Infinity;
      const bracketRange = bracketMax - bracketMin;

      if (taxableIncome > bracketMin) {
        const taxableInBracket = Math.min(remainingIncome, bracketRange);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
      }
    }

    return Math.round(tax);
  };

  const calculate = () => {
    const gross = parseFloat(grossSalary) || 0;
    if (gross <= 0) {
      setResult(null);
      return;
    }

    // Convert to annual
    const grossAnnual = frequency === 'monthly' ? gross * 12 : gross;
    const grossMonthly = frequency === 'monthly' ? gross : gross / 12;

    // Calculate deductions
    const pension = Math.round(grossAnnual * 0.08);
    const nhf = Math.round(grossAnnual * 0.025);
    const nhis = Math.min(Math.round(grossAnnual * 0.05), 25000);
    const lifeInsuranceAmount = Math.round(parseFloat(lifeInsurance) || 0);

    // Rent relief: 20% of rent, max ₦500,000
    const rent = parseFloat(annualRent) || 0;
    const rentRelief = Math.min(Math.round(rent * 0.2), 500000);

    const totalDeductions = pension + nhf + nhis + lifeInsuranceAmount + rentRelief;
    const taxableIncome = Math.max(0, grossAnnual - totalDeductions);

    const totalTax = calculateTax(taxableIncome);
    const netAnnual = grossAnnual - pension - nhf - nhis - totalTax;
    const netMonthly = Math.round(netAnnual / 12);
    const effectiveRate = grossAnnual > 0 ? (totalTax / grossAnnual) * 100 : 0;

    setResult({
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
    });
  };

  useEffect(() => {
    calculate();
  }, [grossSalary, frequency, annualRent, lifeInsurance]);

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Your Details</h3>

        {/* Gross Salary */}
        <div>
          <label htmlFor="gross-salary" className="block text-sm font-medium text-gray-700 mb-2">
            Gross Salary
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="gross-salary"
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'monthly' | 'annual')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              aria-label="Salary frequency"
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="annual-rent" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Rent (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="annual-rent"
                type="number"
                value={annualRent}
                onChange={(e) => setAnnualRent(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">20% relief, max ₦500K</p>
          </div>

          <div>
            <label htmlFor="life-insurance" className="block text-sm font-medium text-gray-700 mb-2">
              Life Insurance (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="life-insurance"
                type="number"
                value={lifeInsurance}
                onChange={(e) => setLifeInsurance(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Annual premium</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && result.grossAnnual > 0 && (
        <div className="space-y-6 pt-6 border-t-2 border-gray-200">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Monthly Take-Home</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.netMonthly)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatCurrency(result.netAnnual)}/year
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {result.effectiveRate.toFixed(2)}% effective rate
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Total Deductions</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.totalDeductions)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Annual relief
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>

            <div className="space-y-3">
              {/* Gross Income */}
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700">Gross Annual Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.grossAnnual)}</span>
              </div>

              {/* Deductions */}
              <div className="space-y-2 py-2">
                <div className="font-medium text-gray-700 mb-2">Tax Reliefs & Deductions:</div>

                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">Pension (8%)</span>
                  <span className="text-gray-700">-{formatCurrency(result.pension)}</span>
                </div>

                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">NHF (2.5%)</span>
                  <span className="text-gray-700">-{formatCurrency(result.nhf)}</span>
                </div>

                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">NHIS (5%, max ₦25K)</span>
                  <span className="text-gray-700">-{formatCurrency(result.nhis)}</span>
                </div>

                {result.rentRelief > 0 && (
                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">Rent Relief (20%, max ₦500K)</span>
                    <span className="text-gray-700">-{formatCurrency(result.rentRelief)}</span>
                  </div>
                )}

                {result.lifeInsurance > 0 && (
                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">Life Insurance</span>
                    <span className="text-gray-700">-{formatCurrency(result.lifeInsurance)}</span>
                  </div>
                )}

                <div className="flex justify-between pl-4 pt-2 border-t border-gray-200 font-medium">
                  <span className="text-gray-700">Total Deductions</span>
                  <span className="text-gray-900">-{formatCurrency(result.totalDeductions)}</span>
                </div>
              </div>

              {/* Taxable Income */}
              <div className="flex justify-between py-2 border-y border-gray-300">
                <span className="font-medium text-gray-700">Taxable Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.taxableIncome)}</span>
              </div>

              {/* Tax Calculation */}
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">PAYE Tax</span>
                <span className="font-semibold text-red-600">-{formatCurrency(result.totalTax)}</span>
              </div>

              {/* Net Income */}
              <div className="flex justify-between py-3 border-t-2 border-gray-400 bg-blue-50 -mx-6 px-6 rounded">
                <span className="font-bold text-gray-900 text-lg">Net Annual Income</span>
                <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.netAnnual)}</span>
              </div>

              <div className="flex justify-between py-3 bg-green-50 -mx-6 px-6 rounded">
                <span className="font-bold text-gray-900 text-lg">Monthly Take-Home</span>
                <span className="font-bold text-green-600 text-lg">{formatCurrency(result.netMonthly)}</span>
              </div>
            </div>
          </div>

          {/* Tax Benefits Info */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-green-600 text-xl mr-2" aria-hidden="true">✓</span>
              <div>
                <h5 className="font-semibold text-green-900 mb-1">Tax Savings with New Act</h5>
                <p className="text-sm text-green-800">
                  You benefit from the ₦800,000 tax-free threshold and lower progressive rates (0-25%)
                  under the Nigeria Tax Act 2025, effective January 2026.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600">
            <p>
              <strong>Note:</strong> This calculator provides estimates based on the Nigeria Tax Act 2025.
              Actual tax may vary based on individual circumstances. Consult a tax professional for
              personalized advice.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!result || result.grossAnnual === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4" aria-hidden="true">💰</div>
          <p>Enter your gross salary above to calculate your PAYE tax and take-home pay</p>
        </div>
      )}
    </div>
  );
}
