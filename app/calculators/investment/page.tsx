'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { InvestmentCalculator } from '@/components/calculators/InvestmentCalculator';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';

export default function InvestmentCalculatorPage() {
  useEffect(() => {
    document.title = 'Investment Income Tax Calculator - NairaTax';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          📊 Investment Income Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate tax on dividends, capital gains, and interest income under Nigeria Tax Act 2025
        </p>

        <div className="bg-white border-2 border-indigo-200 rounded-lg p-6 md:p-8 shadow-lg">
          <CalculatorErrorBoundary calculatorName="Investment Income Tax Calculator">
            <InvestmentCalculator />
          </CalculatorErrorBoundary>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
