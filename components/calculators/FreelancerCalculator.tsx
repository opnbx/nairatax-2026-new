'use client';

import { useState, useEffect } from 'react';

interface CalculationResult {
  grossIncome: number;
  businessExpenses: number;
  netBusinessIncome: number;
  pension: number;
  nhf: number;
  nhis: number;
  rentRelief: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
}

const TAX_BRACKETS = [
  { limit: 800000, rate: 0.00, base: 0 },
  { limit: 3000000, rate: 0.15, base: 800000 },
  { limit: 12000000, rate: 0.18, base: 3000000 },
  { limit: 25000000, rate: 0.21, base: 12000000 },
  { limit: 50000000, rate: 0.23, base: 25000000 },
  { limit: Infinity, rate: 0.25, base: 50000000 },
];

export function FreelancerCalculator() {
  const [grossIncome, setGrossIncome] = useState('5000000');
  const [businessExpenses, setBusinessExpenses] = useState('');
  const [annualRent, setAnnualRent] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateProgressiveTax = (taxableIncome: number): number => {
    if (taxableIncome <= 0) return 0;
    let totalTax = 0;
    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const bracket = TAX_BRACKETS[i];
      if (taxableIncome > bracket.base) {
        const taxableInBracket = Math.min(
          taxableIncome - bracket.base,
          bracket.limit - bracket.base
        );
        totalTax += taxableInBracket * bracket.rate;
      }
    }
    return Math.round(totalTax);
  };

  const calculate = () => {
    const gross = parseFloat(grossIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;

    if (gross <= 0) {
      setResult(null);
      return;
    }

    // Net business income after expenses
    const netBusinessIncome = Math.max(0, gross - expenses);

    // Calculate deductions (based on net business income)
    const pension = Math.round(netBusinessIncome * 0.08);
    const nhf = Math.round(netBusinessIncome * 0.025);
    const nhis = Math.min(Math.round(netBusinessIncome * 0.05), 25000);

    const rent = parseFloat(annualRent) || 0;
    const rentRelief = Math.min(Math.round(rent * 0.2), 500000);

    const totalDeductions = pension + nhf + nhis + rentRelief;
    const taxableIncome = Math.max(0, netBusinessIncome - totalDeductions);
    const totalTax = calculateProgressiveTax(taxableIncome);

    const netIncome = netBusinessIncome - pension - nhf - nhis - totalTax;
    const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

    setResult({
      grossIncome: gross,
      businessExpenses: expenses,
      netBusinessIncome,
      pension,
      nhf,
      nhis,
      rentRelief,
      totalDeductions,
      taxableIncome,
      totalTax,
      netIncome,
      effectiveRate,
    });
  };

  useEffect(() => {
    calculate();
  }, [grossIncome, businessExpenses, annualRent]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-purple-600 text-xl mr-2">💼</span>
          <div>
            <h5 className="font-semibold text-purple-900 mb-1">For Freelancers & Consultants</h5>
            <p className="text-sm text-purple-800">
              Deduct legitimate business expenses before calculating tax. Includes equipment, software,
              home office, professional development, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Your Details</h3>

        <div>
          <label htmlFor="gross-income" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Gross Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              id="gross-income"
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              step="100000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Total revenue before expenses</p>
        </div>

        <div>
          <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 mb-2">
            Business Expenses (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              id="expenses"
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              step="10000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Equipment, software, internet, office supplies, training, travel, etc.
          </p>
        </div>

        <div>
          <label htmlFor="annual-rent" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Rent Paid (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              id="annual-rent"
              type="number"
              value={annualRent}
              onChange={(e) => setAnnualRent(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              step="10000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">20% relief, max ₦500K</p>
        </div>
      </div>

      {result && result.grossIncome > 0 && (
        <div className="space-y-6 pt-6 border-t-2 border-gray-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Net Income</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.netIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">After tax & deductions</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {result.effectiveRate.toFixed(2)}% of gross
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Business Profit</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.netBusinessIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">After expenses</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700">Gross Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.grossIncome)}</span>
              </div>

              {result.businessExpenses > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-700">Business Expenses</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(result.businessExpenses)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 border-y border-gray-300 bg-purple-50 -mx-6 px-6">
                <span className="font-medium text-gray-700">Net Business Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.netBusinessIncome)}</span>
              </div>

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
              </div>

              <div className="flex justify-between py-2 border-y border-gray-300 bg-yellow-50 -mx-6 px-6">
                <span className="font-medium text-gray-700">Taxable Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.taxableIncome)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">PAYE Tax (Progressive)</span>
                <span className="font-semibold text-red-600">-{formatCurrency(result.totalTax)}</span>
              </div>

              <div className="flex justify-between py-3 border-t-2 border-gray-400 bg-blue-50 -mx-6 px-6 rounded">
                <span className="font-bold text-gray-900 text-lg">Net Income</span>
                <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.netIncome)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600">
            <p>
              <strong>Note:</strong> Keep receipts for all business expenses. Allowable deductions include
              equipment, software, professional subscriptions, training courses, business travel, home office
              expenses (proportionate), internet/phone, and other legitimate business costs.
            </p>
          </div>
        </div>
      )}

      {(!result || result.grossIncome === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">💼</div>
          <p>Enter your freelance income to calculate tax with business expense deductions</p>
        </div>
      )}
    </div>
  );
}
