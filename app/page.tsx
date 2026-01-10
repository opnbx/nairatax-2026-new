import { Metadata } from 'next';
import Link from 'next/link';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';

export const metadata: Metadata = {
  title: 'NairaTax - Free Nigerian Tax Calculator 2025',
  description: 'Calculate your Nigerian taxes under the new Tax Act. New ₦800,000 threshold.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">🇳🇬 Nigerian Tax Calculator 2025</h1>
        <p className="text-xl text-gray-700">Accurate tax calculations for the 2025 Tax Act.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white border-2 border-blue-200 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Calculate Employee Tax (PAYE)</h3>
          <CalculatorErrorBoundary calculatorName="Employee Tax Calculator">
            <p className="text-gray-600 text-center py-8">
              Employee Calculator Component Embedded Here.
              <br />
              <Link href="/calculators/employee" className="text-blue-600 font-semibold">Full Page →</Link>
            </p>
          </CalculatorErrorBoundary>
        </div>
      </section>
    </main>
  );
}
