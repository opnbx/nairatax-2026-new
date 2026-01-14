'use client';

import { useState, useEffect } from 'react';

interface CalculationResult {
  grossRevenue: number;
  allowableExpenses: number;
  taxableProfit: number;
  cit: number;
  educationTax: number;
  totalTax: number;
  netProfit: number;
  effectiveRate: number;
  isSmallCompany: boolean;
  qualifiesForExemption: boolean;
}

export function BusinessCalculator() {
  const [revenue, setRevenue] = useState('60000000');
  const [expenses, setExpenses] = useState('');
  const [isProfessionalService, setIsProfessionalService] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const grossRevenue = parseFloat(revenue) || 0;
    const allowableExpenses = parseFloat(expenses) || 0;

    if (grossRevenue <= 0) {
      setResult(null);
      return;
    }

    const taxableProfit = Math.max(0, grossRevenue - allowableExpenses);

    // Small company exemption: Revenue ≤ ₦50M and NOT professional services
    const isSmallCompany = grossRevenue <= 50000000;
    const qualifiesForExemption = isSmallCompany && !isProfessionalService;

    let cit = 0;
    let educationTax = 0;

    if (qualifiesForExemption) {
      // 0% tax for qualifying small companies
      cit = 0;
      educationTax = 0;
    } else {
      // Standard rates: 30% CIT + 2% Education Tax (updated from 4% levy)
      cit = Math.round(taxableProfit * 0.30);
      educationTax = Math.round(taxableProfit * 0.02); // 2% of profit for education tax
    }

    const totalTax = cit + educationTax;
    const netProfit = taxableProfit - totalTax;
    const effectiveRate = grossRevenue > 0 ? (totalTax / grossRevenue) * 100 : 0;

    setResult({
      grossRevenue,
      allowableExpenses,
      taxableProfit,
      cit,
      educationTax,
      totalTax,
      netProfit,
      effectiveRate,
      isSmallCompany,
      qualifiesForExemption,
    });
  };

  useEffect(() => {
    calculate();
  }, [revenue, expenses, isProfessionalService]);

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
      {/* Small Company Info */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-green-600 text-xl mr-2">🏢</span>
          <div>
            <h5 className="font-semibold text-green-900 mb-1">Small Company Exemption</h5>
            <p className="text-sm text-green-800">
              Companies with annual revenue ≤ ₦50 million pay <strong>0% company tax</strong>.
              <br />
              <span className="text-red-700">Exception:</span> Professional services (legal, accounting, medical, consulting) don't qualify.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Business Details</h3>

        {/* Annual Revenue */}
        <div>
          <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Revenue (Turnover)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
              step="1000000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Total annual revenue/turnover</p>
        </div>

        {/* Allowable Expenses */}
        <div>
          <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 mb-2">
            Allowable Business Expenses (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              id="expenses"
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
              step="100000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Salaries, rent, utilities, materials, depreciation, etc.
          </p>
        </div>

        {/* Professional Service Toggle */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isProfessionalService}
              onChange={(e) => setIsProfessionalService(e.target.checked)}
              className="mt-1 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <div>
              <div className="font-medium text-gray-900">Professional Service Business</div>
              <div className="text-sm text-gray-600 mt-1">
                Check this if your business provides professional services: legal, accounting, medical, consulting, engineering, architecture, etc.
                <br />
                <span className="text-red-600 font-medium">Professional services do NOT qualify for small company exemption</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Results Section */}
      {result && result.grossRevenue > 0 && (
        <div className="space-y-6 pt-6 border-t-2 border-gray-200">
          {/* Exemption Alert */}
          {result.qualifiesForExemption && (
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-3xl">🎉</span>
                <div>
                  <h4 className="text-xl font-bold text-green-900 mb-2">You Qualify for Small Company Exemption!</h4>
                  <p className="text-green-800">
                    Your company pays <strong className="text-2xl">0% tax</strong> because:
                  </p>
                  <ul className="mt-2 space-y-1 text-green-800">
                    <li>✓ Annual revenue ≤ ₦50,000,000</li>
                    <li>✓ Not a professional service business</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!result.qualifiesForExemption && result.isSmallCompany && (
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h5 className="font-semibold text-red-900">Professional Service - No Exemption</h5>
                  <p className="text-sm text-red-800 mt-1">
                    Even though revenue is ≤ ₦50M, professional services must pay standard CIT (30%) + Education Tax (2%)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Net Profit (After Tax)</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.netProfit)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                From {formatCurrency(result.taxableProfit)} taxable profit
              </div>
            </div>

            <div className={`rounded-lg p-4 border-2 ${
              result.qualifiesForExemption
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className={`text-2xl font-bold ${
                result.qualifiesForExemption ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {result.effectiveRate.toFixed(2)}% of revenue
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Taxable Profit</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.taxableProfit)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Revenue - Expenses
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>

            <div className="space-y-3">
              {/* Revenue */}
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700">Annual Revenue</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.grossRevenue)}</span>
              </div>

              {/* Expenses */}
              {result.allowableExpenses > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-700">Allowable Expenses</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(result.allowableExpenses)}</span>
                </div>
              )}

              {/* Taxable Profit */}
              <div className="flex justify-between py-2 border-y border-gray-300 bg-yellow-50 -mx-6 px-6">
                <span className="font-medium text-gray-700">Taxable Profit</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.taxableProfit)}</span>
              </div>

              {/* Tax Breakdown */}
              {!result.qualifiesForExemption && (
                <div className="space-y-2 py-2">
                  <div className="font-medium text-gray-700 mb-2">Tax Components:</div>

                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">Company Income Tax (CIT) @ 30%</span>
                    <span className="text-gray-700">-{formatCurrency(result.cit)}</span>
                  </div>

                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">Education Tax @ 2%</span>
                    <span className="text-gray-700">-{formatCurrency(result.educationTax)}</span>
                  </div>

                  <div className="flex justify-between pl-4 pt-2 border-t border-gray-200 font-medium">
                    <span className="text-gray-700">Total Tax</span>
                    <span className="text-red-600">-{formatCurrency(result.totalTax)}</span>
                  </div>
                </div>
              )}

              {result.qualifiesForExemption && (
                <div className="flex justify-between py-2 bg-green-50 -mx-6 px-6 rounded">
                  <span className="font-medium text-gray-700">Total Tax (Small Company Exemption)</span>
                  <span className="font-semibold text-green-600">{formatCurrency(0)}</span>
                </div>
              )}

              {/* Net Profit */}
              <div className="flex justify-between py-3 border-t-2 border-gray-400 bg-blue-50 -mx-6 px-6 rounded">
                <span className="font-bold text-gray-900 text-lg">Net Profit (After Tax)</span>
                <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.netProfit)}</span>
              </div>
            </div>
          </div>

          {/* Tax Rates Info */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Nigeria Company Tax Rates (2026)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold text-green-600">0%</div>
                  <div className="text-sm text-gray-600 mt-1">Small Company Exemption</div>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 mt-3">
                  <li>✓ Revenue ≤ ₦50 million</li>
                  <li>✓ NOT professional services</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold text-red-600">32%</div>
                  <div className="text-sm text-gray-600 mt-1">Standard Rate</div>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 mt-3">
                  <li>• CIT: 30% of profit</li>
                  <li>• Education Tax: 2% of profit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Services Note */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-amber-600 text-xl mr-2">ℹ️</span>
              <div>
                <h5 className="font-semibold text-amber-900 mb-1">Professional Services</h5>
                <p className="text-sm text-amber-800">
                  Legal, accounting, medical, consulting, engineering, architecture, and similar professional practices
                  do NOT qualify for the small company exemption, regardless of revenue size.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600">
            <p>
              <strong>Note:</strong> This calculator provides estimates based on the Nigeria Tax Act 2025.
              Actual tax may vary based on business structure, allowable deductions, capital allowances, and other factors.
              Consult a tax professional or chartered accountant for personalized business tax advice.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!result || result.grossRevenue === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">🏢</div>
          <p>Enter your business revenue to calculate Company Income Tax (CIT)</p>
        </div>
      )}
    </div>
  );
}
