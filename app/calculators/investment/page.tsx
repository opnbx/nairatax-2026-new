import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Investment Income Tax Calculator - NairaTax',
  description: 'Calculate tax on your investment income including dividends, capital gains, and rental income under Nigeria Tax Act 2025.',
};

export default function InvestmentCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Investment Income Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate tax on dividends, capital gains, rental income, and other investments under Nigeria Tax Act 2025
        </p>

        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-8 md:p-12 text-center">
          <div className="text-6xl md:text-7xl mb-6" aria-hidden="true">🚧</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            This calculator is currently under development. We're working hard to bring you accurate
            tax calculations for investment income including stocks, real estate, bonds, and other
            investment vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              ← Back to Homepage
            </Link>
            <Link
              href="/#calculators"
              className="inline-block bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              View Other Calculators
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 text-xl flex-shrink-0">✓</span>
              <span>Capital gains tax calculation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 text-xl flex-shrink-0">✓</span>
              <span>Dividend income tax (withholding tax)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 text-xl flex-shrink-0">✓</span>
              <span>Rental property income tax</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 text-xl flex-shrink-0">✓</span>
              <span>Interest income from savings and bonds</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
