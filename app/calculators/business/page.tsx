'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { BusinessCalculator } from '@/components/calculators/BusinessCalculator';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';

export default function BusinessCalculatorPage() {
  useEffect(() => {
    document.title = 'Business Tax Calculator - NairaTax';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          🏢 Business Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate Company Income Tax (CIT) for your business under Nigeria Tax Act 2025
        </p>

        <div className="bg-white border-2 border-green-200 rounded-lg p-6 md:p-8 shadow-lg">
          <CalculatorErrorBoundary calculatorName="Business Tax Calculator">
            <BusinessCalculator />
          </CalculatorErrorBoundary>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
