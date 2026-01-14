'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { FreelancerCalculator } from '@/components/calculators/FreelancerCalculator';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';

export default function FreelancerCalculatorPage() {
  useEffect(() => {
    document.title = 'Freelancer Tax Calculator - NairaTax';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          💼 Freelancer Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate your tax as a freelancer or self-employed professional under Nigeria Tax Act 2025
        </p>

        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 md:p-8 shadow-lg">
          <CalculatorErrorBoundary calculatorName="Freelancer Tax Calculator">
            <FreelancerCalculator />
          </CalculatorErrorBoundary>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
