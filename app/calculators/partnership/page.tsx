import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partnership Tax Calculator - NairaTax',
  description: 'Calculate tax for partnerships and co-owned businesses under Nigeria Tax Act 2025.',
};

export default function PartnershipCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Partnership Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate tax for partnerships and co-owned businesses under Nigeria Tax Act 2025
        </p>

        <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-8 md:p-12 text-center">
          <div className="text-6xl md:text-7xl mb-6" aria-hidden="true">🚧</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            This calculator is currently under development. We're working hard to bring you accurate
            tax calculations for partnerships, including profit allocation, partner distributions,
            and pass-through taxation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              ← Back to Homepage
            </Link>
            <Link
              href="/#calculators"
              className="inline-block bg-white border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              View Other Calculators
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl flex-shrink-0">✓</span>
              <span>Partnership income allocation by partner share</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl flex-shrink-0">✓</span>
              <span>Individual partner tax liability calculation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl flex-shrink-0">✓</span>
              <span>Guaranteed payments and profit distributions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 text-xl flex-shrink-0">✓</span>
              <span>Pass-through taxation guidance</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
