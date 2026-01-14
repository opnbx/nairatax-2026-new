'use client';

import Link from 'next/link';
import { CalculatorErrorBoundary } from '@/components/CalculatorErrorBoundary';
import { CalculatorCard } from '@/components/CalculatorCard';
import { StatsCard } from '@/components/StatsCard';
import { CALCULATORS } from '@/data/calculators';
import { EmployeeCalculator } from '@/components/calculators/EmployeeCalculator';

export default function HomePage() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4" aria-labelledby="hero-heading">
        <div className="max-w-6xl mx-auto text-center">
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nigerian Tax Calculator 2025
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Calculate your tax under the new Nigeria Tax Act 2025. Free, accurate, and compliant.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-gray-600" role="list">
            <span className="bg-white px-4 py-2 rounded-lg shadow" role="listitem">✓ ₦800,000 Tax-Free</span>
            <span className="bg-white px-4 py-2 rounded-lg shadow" role="listitem">✓ Rates 0-25%</span>
            <span className="bg-white px-4 py-2 rounded-lg shadow" role="listitem">✓ Effective Jan 2026</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div id="main-content">
        {/* Featured: Employee Calculator Section */}
        <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="employee-calculator-heading">
          {/* Employee Calculator Component */}
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6 md:p-8 shadow-lg mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Calculate Your Employee Tax (PAYE)</h3>

            <CalculatorErrorBoundary calculatorName="Employee Tax Calculator">
              <EmployeeCalculator />
            </CalculatorErrorBoundary>
          </div>

          {/* Key Benefits for Employees */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8" role="region" aria-label="Employee tax benefits">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What's New for Employees in 2025?</h3>
            <ul className="grid md:grid-cols-2 gap-4" role="list">
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✓</span>
                <div>
                  <strong className="text-gray-900">₦800,000 Tax-Free</strong>
                  <p className="text-gray-700 text-sm">First ₦800,000 of annual income completely tax-free (up from ₦200,000)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✓</span>
                <div>
                  <strong className="text-gray-900">Lower Tax Rates</strong>
                  <p className="text-gray-700 text-sm">Progressive rates 0%-25%, most employees pay less tax</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✓</span>
                <div>
                  <strong className="text-gray-900">All Deductions Included</strong>
                  <p className="text-gray-700 text-sm">Pension (8%), NHF (2.5%), NHIS (5%), rent relief (up to ₦500K)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-xl flex-shrink-0" aria-hidden="true">✓</span>
                <div>
                  <strong className="text-gray-900">See Your Savings</strong>
                  <p className="text-gray-700 text-sm">Compare old vs. new tax rates side-by-side</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 my-8">
            <div className="flex items-start">
              <span className="text-2xl mr-3 flex-shrink-0" aria-hidden="true">⚠️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This calculator provides estimates based on the Nigeria Tax Act 2025. Actual tax liability
                  may vary based on individual circumstances, additional income sources, and specific deductions.
                  For personalized tax advice, please consult a qualified tax professional or contact the
                  Federal Inland Revenue Service (FIRS). NairaTax is not responsible for any decisions made
                  based on these calculations.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12" role="list">
            <StatsCard 
              value="₦800,000"
              label="Tax-Free Threshold"
              subtext="Up from ₦200,000"
              color="blue"
            />
            <StatsCard 
              value="0% - 25%"
              label="Progressive Tax Rates"
              subtext="Lower rates for most earners"
              color="green"
            />
            <StatsCard 
              value="Jan 2026"
              label="Effective Date"
              subtext="Nigeria Tax Act 2025"
              color="purple"
            />
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4">
          <hr className="border-t-2 border-gray-200 mb-12" />
        </div>

        {/* Other Calculators Section */}
        <section className="max-w-6xl mx-auto px-4 pb-16" aria-labelledby="other-calculators-heading">
          <div className="text-center mb-12">
            <h2 id="other-calculators-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Other Tax Calculators
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Not an employee? We have specialized calculators for freelancers, business owners, 
              content creators, investors, pensioners, and partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {CALCULATORS.map((calc) => (
              <CalculatorCard key={calc.href} {...calc} />
            ))}
          </div>
        </section>

        {/* Understanding Nigeria Tax Act 2025 */}
        <section className="bg-gray-50 py-16 px-4" aria-labelledby="tax-act-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="tax-act-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding the Nigeria Tax Act 2025
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Individuals</h3>
                <ul className="space-y-3 text-gray-700" role="list">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>₦800,000 tax-free threshold</strong> - First ₦800,000 of annual income is completely tax-free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Progressive rates 0%-25%</strong> - Pay tax only on income above threshold</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Rent relief</strong> - Up to ₦500,000 annual rent relief (20% of rent paid)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Pensioner benefit</strong> - Additional ₦200,000 tax-free for pension income</span>
                  </li>
                </ul>
              </article>
              <article className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Businesses</h3>
                <ul className="space-y-3 text-gray-700" role="list">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Small company exemption</strong> - Companies ≤₦50M revenue pay 0% tax (non-professional services)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Standard rate</strong> - 30% CIT + 4% development levy for larger companies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Capital allowances</strong> - Deductions for business assets and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0" aria-hidden="true">•</span>
                    <span><strong>Simplified compliance</strong> - Reduced filing requirements for small businesses</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Tax Brackets Table */}
        <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="tax-brackets-heading">
          <h2 id="tax-brackets-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            2025 Tax Brackets (Effective Jan 2026)
          </h2>
          <div className="md:hidden text-sm text-gray-500 mb-2 text-center" aria-live="polite">
            ← Swipe to see all brackets →
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow touch-pan-x">
            <table className="min-w-full">
              <caption className="sr-only">Nigerian tax brackets for 2025 showing income ranges, tax rates, and maximum tax amounts</caption>
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left font-semibold text-gray-900">Annual Income Range</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left font-semibold text-gray-900">Tax Rate</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left font-semibold text-gray-900">Tax on Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">First ₦800,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-green-600">0%</td>
                  <td className="px-4 md:px-6 py-4">₦0</td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">₦800,001 - ₦1,600,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">7%</td>
                  <td className="px-4 md:px-6 py-4">Max ₦56,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">₦1,600,001 - ₦3,000,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">11%</td>
                  <td className="px-4 md:px-6 py-4">Max ₦154,000</td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">₦3,000,001 - ₦7,000,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">15%</td>
                  <td className="px-4 md:px-6 py-4">Max ₦600,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">₦7,000,001 - ₦15,000,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">19%</td>
                  <td className="px-4 md:px-6 py-4">Max ₦1,520,000</td>
                </tr>
                <tr>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">₦15,000,001 - ₦25,000,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">21%</td>
                  <td className="px-4 md:px-6 py-4">Max ₦2,100,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">Above ₦25,000,000</td>
                  <td className="px-4 md:px-6 py-4 font-semibold">25%</td>
                  <td className="px-4 md:px-6 py-4">25% of excess</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Calculate Your Nigerian Taxes?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Use our employee calculator above or choose a specialized calculator for your situation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center justify-center min-h-[44px] bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition"
                aria-label="Scroll to top to calculate employee tax"
              >
                Calculate Employee Tax
              </button>
              <Link
                href="/calculators/freelancer" 
                className="inline-flex items-center justify-center min-h-[44px] border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition"
                aria-label="View other tax calculators"
              >
                View Other Calculators
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="faq-heading">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about Nigerian taxes and our calculators
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the tax-free threshold under the new law?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The first ₦800,000 of annual income is completely tax-free. If you earn ₦800,000 or less,
                you pay zero income tax. This takes effect January 1, 2026.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What are the new tax rates?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Progressive rates effective January 2026: 0% (first ₦800K), 15% (₦800K-₦3M),
                18% (₦3M-₦12M), 21% (₦12M-₦25M), 23% (₦25M-₦50M), 25% (above ₦50M).
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the small company exemption?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Companies with revenue ≤₦50 million pay 0% company tax. Exception: Professional services
                (legal, accounting, medical, consulting) don't qualify.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does rent relief work?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You can deduct 20% of annual rent paid, up to maximum ₦500,000. This is a NEW benefit
                under the 2026 law - it did not exist before.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What can employees deduct?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pension (8%), NHF (2.5%), NHIS, life insurance, mortgage interest on primary home,
                and rent relief (20% up to ₦500K - NEW in 2026).
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does freelancer WHT work?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Clients deduct 5% withholding tax from payments. This WHT credits against your final
                tax - you pay less or get refund if WHT exceeds tax due.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What benefits do pensioners get?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pensioners get extra ₦200,000 tax-free allowance beyond the standard ₦800,000 threshold -
                effectively ₦1,000,000 tax-free.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What's the tax on investments?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Dividends and interest: 10% WHT (usually final tax). Capital gains: 10% on profits from asset sales.
              </p>
            </div>

            {/* FAQ 9 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I get a TIN?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Register at any NRS (Nigeria Revenue Service) office or online at jtb.gov.ng.
                You need NIN, BVN, and valid government ID.
              </p>
            </div>

            {/* FAQ 10 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                When does this take effect?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The Nigeria Tax Act 2025 was signed into law, but the Nigeria Revenue Service launches
                January 1, 2026. That's when the new rates become effective.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "NairaTax - Nigerian Tax Calculator",
            "description": "Free Nigerian tax calculators for employees (PAYE), freelancers, business owners, content creators, investors, pensioners, and partnerships",
            "url": "https://www.nairatax.ng",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NGN"
            },
            "featureList": [
              "Employee PAYE calculator",
              "Freelancer tax calculator",
              "Business CIT calculator",
              "Content creator tax",
              "Investment income tax",
              "Pensioner tax calculator",
              "Partnership tax calculator"
            ]
          })
        }}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">NairaTax</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Free Nigerian tax calculators for employees, freelancers, businesses, and more.
                Calculate your tax accurately under Nigeria Tax Act 2025.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#calculators" className="text-gray-400 hover:text-white transition">
                    All Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-gray-400 hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-xl" aria-hidden="true">📧</span>
                  <a
                    href="mailto:webchief@nairatax.ng"
                    className="text-gray-400 hover:text-white transition"
                  >
                    webchief@nairatax.ng
                  </a>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mt-4">
                  For official tax guidance, visit{' '}
                  <a
                    href="https://www.firs.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    FIRS
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Not professional tax advice.
            </p>
            <p>© 2025-2026 NairaTax.ng. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}