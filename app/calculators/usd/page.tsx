import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { UsdCalc } from '@/components/calc/UsdCalc';
import Link from 'next/link';
import { CalcGuide } from '@/components/content/blocks';
import { computeEmployee, naira, pct } from '@/lib/tax-engine';

// Worked example: $2,000 a month at an illustrative rate (the calculator's defaults).
const EX_USD = 2000;
const EX_RATE = 1550;
const ex = computeEmployee({ amount: String(EX_USD * 12 * EX_RATE), period: 'annual', rent: '', ins: '' });
const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export const metadata = pageMetadata({
  title: `USD Salary Tax Calculator Nigeria ${TAX_YEAR}`,
  description:
    'Paid in US dollars? Convert your foreign-currency income to naira and estimate your PAYE take-home under the Nigeria Tax Act 2025.',
  path: '/calculators/usd/',
});

export default function UsdPage() {
  return (
    <PageShell variant="sub" page="USD income">
      <CalcHero
        eyebrow="Remote & foreign-paid · US dollars"
        title="Dollar income, taxed in naira."
        sub="Convert your USD earnings at today's rate and see your PAYE take-home under Nigeria's 2026 tax regime — the same reliefs apply."
        stats={[
          { fig: '₦/$1', label: 'Your own rate' },
          { fig: '0%–25%', label: 'Progressive rates' },
          { fig: '₦800K', label: 'Tax-free first' },
        ]}
      >
        <UsdCalc />
      </CalcHero>

      <SupportSection
        eyebrow="How it works"
        title="From dollars to take-home"
        steps={[
          { idx: '01', title: 'Convert at your rate', body: 'Enter the naira-per-dollar rate you actually receive; your gross is converted before any tax is applied.' },
          { idx: '02', title: 'Same PAYE reliefs', body: 'Pension (8%) and NHF (2.5%) are deducted automatically, and rent relief applies just as for naira salaries.' },
          { idx: '03', title: 'Progressive bands', body: 'The first ₦800,000 is tax-free, then 15%–25% applies to the balance of your converted income.' },
        ]}
      />

      <CalcGuide
        name="usd-faq"
        title="How dollar income is taxed in Nigeria"
        intro="Foreign-currency pay is converted to naira first, then taxed exactly like a naira salary."
        table={{
          caption: 'Worked example of PAYE on a US dollar salary in Nigeria, 2026',
          head: ['', 'Per month', 'Per year'],
          rows: [
            ['Salary in US dollars', usd(EX_USD), usd(EX_USD * 12)],
            [`Converted at ${naira(EX_RATE)} per $1`, naira(ex.grossMonthly), naira(ex.gross)],
            ['Pension (8%) and NHF (2.5%)', `– ${naira(ex.deductions / 12)}`, `– ${naira(ex.deductions)}`],
            ['PAYE tax', `– ${naira(ex.tax / 12)}`, `– ${naira(ex.tax)}`],
            ['Take-home pay', naira(ex.takeHomeMonthly), naira(ex.takeHome)],
          ],
          highlight: 4,
        }}
        faqTitle="Dollar income questions, answered"
        faqs={[
          {
            q: 'Do I pay Nigerian tax on income earned in dollars?',
            a: 'If you are tax-resident in Nigeria, yes. Your income is taxable here whatever currency it is paid in and wherever the employer is based. It is converted to naira and taxed at the normal bands.',
          },
          {
            q: 'Which exchange rate should I use?',
            a: 'Use the naira-per-dollar rate you actually received when the money reached you. If your rate changed during the year, an average of the rates you received gives a fair estimate.',
          },
          {
            q: 'Does this work for pounds or euros?',
            a: 'Yes. Enter your income in that currency and the naira you receive per unit of it as the exchange rate. The tax calculation is the same.',
          },
          {
            q: 'I am a freelancer paid in dollars, not an employee. Is this the right calculator?',
            a: (
              <>
                No. This one deducts pension and NHF the way an employer would. Convert your earnings to naira and use
                the <Link href="/calculators/freelancer/">freelancer calculator</Link>, which lets you deduct business
                expenses instead.
              </>
            ),
          },
        ]}
      >
        <p>
          A salary of {usd(EX_USD)} a month is {usd(EX_USD * 12)} a year. At an illustrative rate of {naira(EX_RATE)}{' '}
          to the dollar, that is <strong>{naira(ex.gross)}</strong> of gross income.
        </p>
        <p>
          After pension and NHF, the taxable income is {naira(ex.taxable)}. PAYE on that is {naira(ex.tax)} a year —{' '}
          {pct(ex.effective)} of gross pay — which leaves a take-home of about {naira(ex.takeHomeMonthly)} a month.
        </p>
        <p>The rate is only an example. Enter the rate you actually receive in the calculator above.</p>
      </CalcGuide>

      <MoreCalculators current="USD income" />
    </PageShell>
  );
}
