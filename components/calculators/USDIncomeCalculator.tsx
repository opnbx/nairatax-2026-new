'use client';

import { useState, useEffect } from 'react';
import { calculateProgressiveTax, formatCurrency as formatNGN, sanitizeNumberInput } from '@/lib/tax-utils';

interface CalculationResult {
  monthlyUSD: number;
  annualUSD: number;
  monthlyNGN: number;
  annualNGN: number;
  pension: number;
  nhf: number;
  nhis: number;
  rentRelief: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  effectiveRate: number;
}

export function USDIncomeCalculator() {
  const [usdIncome, setUsdIncome] = useState('2000');
  const [frequency, setFrequency] = useState<'monthly' | 'annual'>('monthly');
  const [exchangeRate, setExchangeRate] = useState('1550');
  const [annualRent, setAnnualRent] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const usd = sanitizeNumberInput(usdIncome);
    const rate = sanitizeNumberInput(exchangeRate);

    if (usd <= 0 || rate <= 0) {
      setResult(null);
      return;
    }

    // Convert USD to NGN
    const monthlyUSD = frequency === 'monthly' ? usd : usd / 12;
    const annualUSD = frequency === 'monthly' ? usd * 12 : usd;
    const monthlyNGN = monthlyUSD * rate;
    const annualNGN = annualUSD * rate;

    // Calculate mandatory deductions
    const pension = Math.round(annualNGN * 0.08);
    const nhf = Math.round(annualNGN * 0.025);
    const nhis = Math.min(Math.round(annualNGN * 0.05), 25000);

    // Calculate rent relief
    const rent = sanitizeNumberInput(annualRent);
    const rentRelief = Math.min(Math.round(rent * 0.2), 500000);

    const totalDeductions = pension + nhf + nhis + rentRelief;
    const taxableIncome = Math.max(0, annualNGN - totalDeductions);
    const totalTax = calculateProgressiveTax(taxableIncome);

    const netAnnual = annualNGN - pension - nhf - nhis - totalTax;
    const netMonthly = Math.round(netAnnual / 12);
    const effectiveRate = annualNGN > 0 ? (totalTax / annualNGN) * 100 : 0;

    setResult({
      monthlyUSD,
      annualUSD,
      monthlyNGN: Math.round(monthlyNGN),
      annualNGN: Math.round(annualNGN),
      pension,
      nhf,
      nhis,
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
  }, [usdIncome, frequency, exchangeRate, annualRent]);

  const formatCurrency = (amount: number, currency: 'NGN' | 'USD' = 'NGN') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return formatNGN(amount);
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-blue-600 text-xl mr-2">💡</span>
          <div>
            <p className="text-sm text-blue-800">
              <strong>Earn in USD?</strong> Convert to Naira first, then see your Nigerian tax obligation.
              Update exchange rate from Wise, Binance, Grey, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Your Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* USD Income */}
          <div>
            <label htmlFor="usd-income" className="block text-sm font-medium text-gray-700 mb-2">
              {frequency === 'monthly' ? 'Monthly' : 'Annual'} USD Income
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="usd-income"
                  type="number"
                  value={usdIncome}
                  onChange={(e) => setUsdIncome(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="100"
                />
              </div>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'monthly' | 'annual')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                aria-label="Income frequency"
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annually</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">Remote work, freelance, etc.</p>
          </div>

          {/* Exchange Rate */}
          <div>
            <label htmlFor="exchange-rate" className="block text-sm font-medium text-gray-700 mb-2">
              Exchange Rate (₦/$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="exchange-rate"
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="1550"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Check Wise, Binance, Grey for rates</p>
          </div>
        </div>

        {/* Annual Rent */}
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
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="10000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {annualRent && sanitizeNumberInput(annualRent) > 0
              ? `20% relief = ${formatCurrency(Math.min(sanitizeNumberInput(annualRent) * 0.2, 500000))}${
                  sanitizeNumberInput(annualRent) * 0.2 > 500000 ? ' (capped at ₦500K)' : ''
                }`
              : '20% relief, max ₦500K'}
          </p>
        </div>
      </div>

      {/* Results Section */}
      {result && result.annualNGN > 0 && (
        <div className="space-y-6 pt-6 border-t-2 border-gray-200">
          {/* Conversion Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">USD → NGN Conversion</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(result.monthlyUSD, 'USD')} → {formatCurrency(result.monthlyNGN)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Annual Income</div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(result.annualUSD, 'USD')} → {formatCurrency(result.annualNGN)}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              @ ₦{exchangeRate}/$ exchange rate
            </p>
          </div>

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
              <div className="text-xs text-gray-500 mt-1">Tax relief</div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>

            <div className="space-y-3">
              {/* Gross Income */}
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700">Gross Annual Income (NGN)</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.annualNGN)}</span>
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

                <div className="flex justify-between pl-4 pt-2 border-t border-gray-200 font-medium">
                  <span className="text-gray-700">Total Deductions</span>
                  <span className="text-gray-900">-{formatCurrency(result.totalDeductions)}</span>
                </div>
              </div>

              {/* Taxable Income */}
              <div className="flex justify-between py-2 border-y border-gray-300 bg-yellow-50 -mx-6 px-6">
                <span className="font-medium text-gray-700">Taxable Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.taxableIncome)}</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">PAYE Tax (Progressive Rates)</span>
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

          {/* Tax Brackets Display */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">New Tax Rates (Effective Jan 2026)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">0%</div>
                <div className="text-xs text-gray-600 mt-1">≤₦800K</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">15%</div>
                <div className="text-xs text-gray-600 mt-1">₦800K-3M</div>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded">
                <div className="text-2xl font-bold text-indigo-600">18%</div>
                <div className="text-xs text-gray-600 mt-1">₦3M-12M</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">21%</div>
                <div className="text-xs text-gray-600 mt-1">₦12M-25M</div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded">
                <div className="text-2xl font-bold text-pink-600">23%</div>
                <div className="text-xs text-gray-600 mt-1">₦25M-50M</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-2xl font-bold text-red-600">25%</div>
                <div className="text-xs text-gray-600 mt-1">&gt;₦50M</div>
              </div>
            </div>
          </div>

          {/* Need a TIN */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-purple-600 text-xl mr-2">📋</span>
              <div>
                <h5 className="font-semibold text-purple-900 mb-1">Need a TIN?</h5>
                <p className="text-sm text-purple-800">
                  Register at{' '}
                  <a
                    href="https://jtb.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:text-purple-900"
                  >
                    jtb.gov.ng
                  </a>{' '}
                  or any NRS office. Bring NIN, BVN, and valid ID.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600">
            <p>
              <strong>Note:</strong> This calculator provides estimates based on the Nigeria Tax Act 2025.
              Exchange rates fluctuate daily. Actual tax may vary. Consult a tax professional for
              personalized advice.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!result || result.annualNGN === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">💵</div>
          <p>Enter your USD income and exchange rate to calculate your Nigerian tax obligation</p>
        </div>
      )}
    </div>
  );
}
