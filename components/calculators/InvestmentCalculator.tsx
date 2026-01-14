'use client';

import { useState, useEffect } from 'react';

interface CalculationResult {
  dividendIncome: number;
  interestIncome: number;
  capitalGains: number;
  totalInvestmentIncome: number;
  whtDividend: number;
  whtInterest: number;
  cgtTax: number;
  totalTax: number;
  netIncome: number;
}

export function InvestmentCalculator() {
  const [dividendIncome, setDividendIncome] = useState('');
  const [interestIncome, setInterestIncome] = useState('');
  const [capitalGains, setCapitalGains] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const dividend = parseFloat(dividendIncome) || 0;
    const interest = parseFloat(interestIncome) || 0;
    const gains = parseFloat(capitalGains) || 0;

    if (dividend <= 0 && interest <= 0 && gains <= 0) {
      setResult(null);
      return;
    }

    // Withholding Tax: 10% on dividends, 10% on interest (standard rates)
    const whtDividend = Math.round(dividend * 0.10);
    const whtInterest = Math.round(interest * 0.10);

    // Capital Gains Tax: 10% (standard rate)
    const cgtTax = Math.round(gains * 0.10);

    const totalInvestmentIncome = dividend + interest + gains;
    const totalTax = whtDividend + whtInterest + cgtTax;
    const netIncome = totalInvestmentIncome - totalTax;

    setResult({
      dividendIncome: dividend,
      interestIncome: interest,
      capitalGains: gains,
      totalInvestmentIncome,
      whtDividend,
      whtInterest,
      cgtTax,
      totalTax,
      netIncome,
    });
  };

  useEffect(() => {
    calculate();
  }, [dividendIncome, interestIncome, capitalGains]);

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
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-indigo-600 text-xl mr-2">📊</span>
          <div>
            <h5 className="font-semibold text-indigo-900 mb-1">Investment Income Tax</h5>
            <p className="text-sm text-indigo-800">
              Calculate tax on dividends, interest, and capital gains. Includes automatic WHT deductions.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Your Investment Income</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dividend" className="block text-sm font-medium text-gray-700 mb-2">
              Dividend Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="dividend"
                type="number"
                value={dividendIncome}
                onChange={(e) => setDividendIncome(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
                step="10000"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Stock dividends</p>
          </div>

          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
              Interest Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="interest"
                type="number"
                value={interestIncome}
                onChange={(e) => setInterestIncome(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
                step="10000"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Savings, bonds</p>
          </div>

          <div>
            <label htmlFor="capital-gains" className="block text-sm font-medium text-gray-700 mb-2">
              Capital Gains
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="capital-gains"
                type="number"
                value={capitalGains}
                onChange={(e) => setCapitalGains(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
                step="10000"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Profit from sales</p>
          </div>
        </div>
      </div>

      {result && result.totalInvestmentIncome > 0 && (
        <div className="space-y-6 pt-6 border-t-2 border-gray-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Net Income</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.netIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">After tax</div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs text-gray-500 mt-1">WHT + CGT</div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
              <div className="text-sm text-gray-600 mb-1">Gross Income</div>
              <div className="text-2xl font-bold text-indigo-600">
                {formatCurrency(result.totalInvestmentIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Before tax</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown</h4>
            <div className="space-y-3">
              {result.dividendIncome > 0 && (
                <>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium text-gray-700">Dividend Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.dividendIncome)}</span>
                  </div>
                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">WHT @ 10%</span>
                    <span className="text-red-600">-{formatCurrency(result.whtDividend)}</span>
                  </div>
                </>
              )}

              {result.interestIncome > 0 && (
                <>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium text-gray-700">Interest Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.interestIncome)}</span>
                  </div>
                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">WHT @ 10%</span>
                    <span className="text-red-600">-{formatCurrency(result.whtInterest)}</span>
                  </div>
                </>
              )}

              {result.capitalGains > 0 && (
                <>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium text-gray-700">Capital Gains</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.capitalGains)}</span>
                  </div>
                  <div className="flex justify-between pl-4 text-sm">
                    <span className="text-gray-600">CGT @ 10%</span>
                    <span className="text-red-600">-{formatCurrency(result.cgtTax)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between py-3 border-t-2 border-gray-400 bg-blue-50 -mx-6 px-6 rounded">
                <span className="font-bold text-gray-900 text-lg">Net Investment Income</span>
                <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.netIncome)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tax Rates (2026)</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">10%</div>
                <div className="text-sm text-gray-600 mt-2">Dividend WHT</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">10%</div>
                <div className="text-sm text-gray-600 mt-2">Interest WHT</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">10%</div>
                <div className="text-sm text-gray-600 mt-2">Capital Gains Tax</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-amber-600 text-xl mr-2">ℹ️</span>
              <div>
                <h5 className="font-semibold text-amber-900 mb-1">Withholding Tax (WHT)</h5>
                <p className="text-sm text-amber-800">
                  WHT is automatically deducted at source by banks and companies. This calculator shows
                  your net income after these automatic deductions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded p-4 text-xs text-gray-600">
            <p>
              <strong>Note:</strong> This is a simplified calculator. Some exemptions may apply
              (e.g., government bonds may be tax-exempt). Consult a tax advisor for complex investment portfolios.
            </p>
          </div>
        </div>
      )}

      {(!result || result.totalInvestmentIncome === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">📊</div>
          <p>Enter your investment income to calculate tax on dividends, interest, and capital gains</p>
        </div>
      )}
    </div>
  );
}
