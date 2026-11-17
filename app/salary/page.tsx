import Link from 'next/link';
import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { ContentSection, CtaBand, DataTable, Faq, PageHero, Prose } from '@/components/content/blocks';
import { bandBreakdown, naira, pct } from '@/lib/tax-engine';
import { MONTHLY_SALARIES, salaryFigures, salaryHref } from '@/lib/salary-pages';

export const metadata = pageMetadata({
  title: `How Much Tax Is Deducted From Salary in Nigeria? (${TAX_YEAR} PAYE)`,
  description:
    'PAYE in Nigeria is 0% on the first ₦800,000 of taxable income and 15% to 25% above it. See the tax deducted from monthly salaries of ₦100,000 to ₦5 million in 2026.',
  path: '/salary/',
});

/** Worked example used in the hero and the step-by-step section. */
const EXAMPLE_MONTHLY = 500000;
const ex = salaryFigures(EXAMPLE_MONTHLY);
const exBands = bandBreakdown(ex.taxable).filter((b) => b.amount > 0);

/** Highest gross salary that still pays no PAYE with pension + NHF deducted. */
const ZERO_TAX_GROSS = 800000 / (1 - 0.08 - 0.025);

const effectiveAt = (monthly: number) => pct(salaryFigures(monthly).effective);

export default function SalaryTaxPage() {
  return (
    <PageShell variant="sub" section="Guides" page="Tax on salary">
      <PageHero
        eyebrow="PAYE · Nigeria Tax Act 2025"
        title="How much tax is deducted from salary in Nigeria?"
        sub={
          <>
            Since 1 January 2026, PAYE is charged at 0% on the first ₦800,000 of taxable income a year and at 15%
            to 25% on the rest. On a salary of {naira(EXAMPLE_MONTHLY)} a month that comes to about{' '}
            {naira(ex.tax / 12)} a month — {pct(ex.effective)} of gross pay.
          </>
        }
        stats={[
          { fig: '₦800,000', label: 'Taxed at 0% each year' },
          { fig: '15%–25%', label: 'Rates above that' },
          { fig: pct(ex.effective), label: `Effective rate at ${naira(EXAMPLE_MONTHLY)}/month` },
        ]}
      />

      <ContentSection
        id="salaries"
        eyebrow="Salary by salary"
        title="Tax deducted from common monthly salaries"
        intro="Each figure assumes the standard 8% pension and 2.5% NHF contributions and no rent or insurance relief. Select a salary for the full breakdown."
      >
        <DataTable
          caption="PAYE, other deductions and take-home pay by gross monthly salary, 2026"
          head={['Gross salary / month', 'PAYE / month', 'Pension + NHF', 'Take-home / month', 'Effective tax rate']}
          rows={MONTHLY_SALARIES.map((m) => {
            const r = salaryFigures(m);
            return [
              <Link key={m} href={salaryHref(m)}>{naira(m)}</Link>,
              naira(r.tax / 12),
              naira(r.deductions / 12),
              naira(r.takeHomeMonthly),
              pct(r.effective),
            ];
          })}
        />
        <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-muted">
          Your own figure will be lower if you pay rent or a life-insurance premium. Enter them in the{' '}
          <Link href="/#calculator" className="font-medium text-gold-light hover:underline">PAYE calculator</Link> for an exact estimate.
        </p>
      </ContentSection>

      <ContentSection
        id="how"
        tint
        eyebrow="Step by step"
        title="How PAYE is worked out"
        intro={`The same four steps apply to every salary. Here they are for ${naira(EXAMPLE_MONTHLY)} a month.`}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Prose>
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                <strong>Start with gross pay for the year.</strong> {naira(EXAMPLE_MONTHLY)} a month is {naira(ex.gross)} a year.
              </li>
              <li>
                <strong>Take off the reliefs.</strong> Pension at 8% ({naira(ex.pension)}) and NHF at 2.5% ({naira(ex.nhf)}) come
                off first, along with any NHIS contribution, life-insurance premium and rent relief. That leaves a taxable
                income of {naira(ex.taxable)}.
              </li>
              <li>
                <strong>Apply the bands.</strong> The first ₦800,000 is taxed at 0%, and each slice above it is taxed at
                its own rate. Only the income inside a band is taxed at that band&apos;s rate.
              </li>
              <li>
                <strong>Divide by twelve.</strong> The annual tax of {naira(ex.tax)} is deducted as {naira(ex.tax / 12)} from
                each month&apos;s pay.
              </li>
            </ol>
            <p>
              The full rate table, and how it compares with the old brackets, is on the{' '}
              <Link href="/tax-bands/">2026 tax bands</Link> page.
            </p>
          </Prose>
          <DataTable
            caption={`Band-by-band PAYE on a taxable income of ${naira(ex.taxable)}`}
            head={['Slice of taxable income', 'Rate', 'Tax']}
            rows={[
              ...exBands.map((b) => [
                b.from === 0 ? `First ${naira(b.amount)}` : `Next ${naira(b.amount)}`,
                `${Math.round(b.rate * 100)}%`,
                naira(b.tax),
              ]),
              [`Total on ${naira(ex.taxable)}`, '', naira(ex.tax)],
            ]}
            highlight={exBands.length}
          />
        </div>
      </ContentSection>

      <ContentSection id="faq" narrow eyebrow="Frequently asked" title="Salary tax questions, answered">
        <Faq
          name="salary-faq"
          items={[
            {
              q: 'What percentage of salary is deducted as tax in Nigeria?',
              a: (
                <>
                  There is no single percentage. The rates are 0%, 15%, 18%, 21%, 23% and 25%, and each applies only to
                  the slice of income inside its band, so the share of your whole salary that goes to tax is lower than
                  your top rate: about {effectiveAt(200000)} at ₦200,000 a month, {effectiveAt(500000)} at ₦500,000 and{' '}
                  {effectiveAt(1000000)} at ₦1,000,000.
                </>
              ),
            },
            {
              q: 'How much salary is tax-free?',
              a: (
                <>
                  The first ₦800,000 of taxable income each year is taxed at 0%. Because pension and NHF are deducted
                  before tax, a gross salary of up to about {naira(ZERO_TAX_GROSS)} a year ({naira(ZERO_TAX_GROSS / 12)} a
                  month) carries no PAYE on these assumptions.
                </>
              ),
            },
            {
              q: 'What else is deducted from my salary besides PAYE?',
              a: 'Your pension contribution (8%) and the National Housing Fund (2.5%) are the usual ones. They are not taxes, but they reduce your take-home pay — and both are deducted before your tax is worked out, so they also reduce your PAYE.',
            },
            {
              q: 'Does paying rent reduce my tax?',
              a: 'Yes. You can deduct 20% of the rent you pay in the year, up to a maximum of ₦500,000. The relief was introduced by the Nigeria Tax Act 2025, which also removed the old consolidated relief allowance.',
            },
            {
              q: 'Is PAYE calculated monthly or yearly?',
              a: 'The bands are annual. Your employer estimates your tax for the full year and deducts one-twelfth of it from each month’s pay, which is why a mid-year pay rise changes the monthly deduction.',
            },
          ]}
        />
      </ContentSection>

      <CtaBand
        title="Work out the tax on your own salary"
        primary={{ label: 'Open the PAYE calculator', href: '/#calculator' }}
        secondary={{ label: 'See the 2026 tax bands', href: '/tax-bands/' }}
      />
    </PageShell>
  );
}
