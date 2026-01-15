import { Metadata } from 'next';
import Link from 'next/link';
import { CreatorCalculator } from '@/components/calculators/CreatorCalculator';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';

export const metadata: Metadata = {
  title: 'Content Creator Tax Calculator - NairaTax',
  description: 'Calculate tax for YouTube, TikTok, Instagram creators and influencers under Nigeria Tax Act 2025. Includes platform fees and production expenses.',
};

export default function CreatorCalculatorPage() {

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          📱 Content Creator Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate your tax as a content creator, influencer, or digital entrepreneur under Nigeria Tax Act 2025
        </p>

        <div className="bg-white border-2 border-pink-200 rounded-lg p-6 md:p-8 shadow-lg">
          <CalculatorErrorBoundary calculatorName="Content Creator Tax Calculator">
            <CreatorCalculator />
          </CalculatorErrorBoundary>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
