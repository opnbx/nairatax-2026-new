'use client';

import { useState, useEffect } from 'react';

interface CalculationResult {
  grossIncome: number;
  platformFees: number;
  equipmentCosts: number;
  otherExpenses: number;
  totalExpenses: number;
  netBusinessIncome: number;
  pension: number;
  nhf: number;
  nhis: number;
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

export function CreatorCalculator() {
  const [grossIncome, setGrossIncome] = useState('3000000');
  const [platformFees, setPlatformFees] = useState('');
  const [equipmentCosts, setEquipmentCosts] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
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
    const fees = parseFloat(platformFees) || 0;
    const equipment = parseFloat(equipmentCosts) || 0;
    const other = parseFloat(otherExpenses) || 0;

    if (gross <= 0) {
      setResult(null);
      return;
    }

    const totalExpenses = fees + equipment + other;
    const netBusinessIncome = Math.max(0, gross - totalExpenses);

    const pension = Math.round(netBusinessIncome * 0.08);
    const nhf = Math.round(netBusinessIncome * 0.025);
    const nhis = Math.min(Math.round(netBusinessIncome * 0.05), 25000);

    const totalDeductions = pension + nhf + nhis;
    const taxableIncome = Math.max(0, netBusinessIncome - totalDeductions);
    const totalTax = calculateProgressiveTax(taxableIncome);

    const netIncome = netBusinessIncome - pension - nhf - nhis - totalTax;
    const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

    setResult({
      grossIncome: gross,
      platformFees: fees,
      equipmentCosts: equipment,
      otherExpenses: other,
      totalExpenses,
      netBusinessIncome,
      pension,
      nhf,
      nhis,
      totalDeductions,
      taxableIncome,
      totalTax,
      netIncome,
      effectiveRate,
    });
  };

  useEffect(() => {
    calculate();
  }, [grossIncome, platformFees, equipmentCosts, otherExpenses]);

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
      <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-pink-600 text-xl mr-2">📱</span>
          <div>
            <h5 className="font-semibold text-pink-900 mb-1">For Content Creators</h5>
            <p className="text-sm text-pink-800">
              YouTube, Instagram, TikTok, and other platform income. Deduct platform fees, equipment,
              software, and production costs.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Enter Your Creator Income</h3>

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
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min="0"
              step="100000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Total from all platforms (AdSense, sponsorships, affiliate, etc.)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="platform-fees" className="block text-sm font-medium text-gray-700 mb-2">
              Platform Fees
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="platform-fees"
                type="number"
                value={platformFees}
                onChange={(e) => setPlatformFees(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                min="0"
                step="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">YouTube, TikTok cuts</p>
          </div>

          <div>
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
              Equipment/Software
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="equipment"
                type="number"
                value={equipmentCosts}
                onChange={(e) => setEquipmentCosts(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                min="0"
                step="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Camera, mic, editing</p>
          </div>

          <div>
            <label htmlFor="other-expenses" className="block text-sm font-medium text-gray-700 mb-2">
              Other Expenses
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                id="other-expenses"
                type="number"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                min="0"
                step="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Internet, props, etc.</p>
          </div>
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
              <div className="text-xs text-gray-500 mt-1">Annual take-home</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs text-gray-500 mt-1">{result.effectiveRate.toFixed(2)}% of gross</div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
              <div className="text-sm text-gray-600 mb-1">Business Profit</div>
              <div className="text-2xl font-bold text-pink-600">
                {formatCurrency(result.netBusinessIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">After expenses</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="font-medium text-gray-700">Gross Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.grossIncome)}</span>
              </div>

              {result.totalExpenses > 0 && (
                <>
                  <div className="space-y-2 py-2">
                    <div className="font-medium text-gray-700 mb-2">Business Expenses:</div>
                    {result.platformFees > 0 && (
                      <div className="flex justify-between pl-4 text-sm">
                        <span className="text-gray-600">Platform Fees</span>
                        <span className="text-gray-700">-{formatCurrency(result.platformFees)}</span>
                      </div>
                    )}
                    {result.equipmentCosts > 0 && (
                      <div className="flex justify-between pl-4 text-sm">
                        <span className="text-gray-600">Equipment/Software</span>
                        <span className="text-gray-700">-{formatCurrency(result.equipmentCosts)}</span>
                      </div>
                    )}
                    {result.otherExpenses > 0 && (
                      <div className="flex justify-between pl-4 text-sm">
                        <span className="text-gray-600">Other Expenses</span>
                        <span className="text-gray-700">-{formatCurrency(result.otherExpenses)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between py-2 border-y border-gray-300 bg-pink-50 -mx-6 px-6">
                    <span className="font-medium text-gray-700">Net Business Income</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.netBusinessIncome)}</span>
                  </div>
                </>
              )}

              <div className="space-y-2 py-2">
                <div className="font-medium text-gray-700 mb-2">Tax Deductions:</div>
                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">Pension (8%)</span>
                  <span className="text-gray-700">-{formatCurrency(result.pension)}</span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">NHF (2.5%)</span>
                  <span className="text-gray-700">-{formatCurrency(result.nhf)}</span>
                </div>
                <div className="flex justify-between pl-4 text-sm">
                  <span className="text-gray-600">NHIS (5%)</span>
                  <span className="text-gray-700">-{formatCurrency(result.nhis)}</span>
                </div>
              </div>

              <div className="flex justify-between py-2 border-y border-gray-300 bg-yellow-50 -mx-6 px-6">
                <span className="font-medium text-gray-700">Taxable Income</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.taxableIncome)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-700">PAYE Tax</span>
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
              <strong>Deductible Expenses:</strong> Camera, microphone, lighting, editing software, computer,
              studio rent, props, internet, phone, travel for shoots, collaborator fees, and other legitimate
              production costs.
            </p>
          </div>
        </div>
      )}

      {(!result || result.grossIncome === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">📱</div>
          <p>Enter your creator income to calculate tax with business expense deductions</p>
        </div>
      )}
    </div>
  );
}
