import Link from 'next/link';
import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { ContentSection, CtaBand, DataTable, Faq, PageHero, Prose } from '@/components/content/blocks';
import { NEW_BANDS, OLD_BANDS, naira, progressive } from '@/lib/tax-engine';
import { salaryFigures, salaryHref } from '@/lib/salary-pages';

export const metadata = pageMetadata({
  title: `Nigeria Tax Bands & PAYE Rates ${TAX_YEAR} (vs the Old Tax Brackets)`,
  description:
    'The 2026 personal income tax bands in Nigeria: 0% on the first ₦800,000, then 15%, 18%, 21%, 23% and 25%. Compare them with the old 7%–24% tax brackets used up to 2025.',
  path: '/tax-bands/',
});

type Band = (typeof NEW_BANDS)[number];

/** Table rows for a band schedule: range, rate, and tax due at the top of each band. */
function bandRows(bands: Band[]): string[][] {
  return bands.map(([cap, rate], i) => {
    const prev = i === 0 ? 0 : bands[i - 1][0];
    const ratePct = `${Math.round(rate * 100)}%`;
    if (cap === Infinity) return [`Above ${naira(prev)}`, ratePct, '—'];
    const range = i === 0 ? `First ${naira(cap)}` : `Next ${naira(cap - prev)} (up to ${naira(cap)})`;
    return [range, ratePct, naira(progressive(cap, bands))];
  });
}

/** Salaries used for the old-vs-new comparison. */
const COMPARE = [100000, 200000, 300000, 500000, 1000000, 2000000, 5000000];

export default function TaxBandsPage() {
  return (
    <PageShell variant="sub" section="Guides" page="Tax bands">
      <PageHero
        eyebrow="Personal income tax · Nigeria Tax Act 2025"
        title="Nigeria tax bands and PAYE rates for 2026"
        sub="Six progressive bands apply to taxable income from 1 January 2026: 0% on the first ₦800,000, rising in steps to 25% above ₦50 million. They replaced the 7%–24% brackets used up to the end of 2025."
        stats={[
          { fig: '₦800,000', label: 'Tax-free threshold' },
          { fig: '0%–25%', label: 'Six bands' },
          { fig: '1 Jan 2026', label: 'Effective date' },
        ]}
      />

      <ContentSection
        id="2026"
        eyebrow="Current rates"
        title="2026 tax bands"
        intro="The bands apply to annual taxable income — what is left of your pay after pension, NHF and other reliefs. The same bands apply to employees and the self-employed."
      >
        <DataTable
          caption="Nigeria personal income tax bands from 1 January 2026"
          head={['Annual taxable income', 'Rate', 'Total tax at top of band']}
          rows={bandRows(NEW_BANDS)}
        />
        <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-muted">
          Only the income inside a band is taxed at that band&apos;s rate. Moving into a higher band never reduces
          your take-home pay.
        </p>
      </ContentSection>

      <ContentSection
        id="old"
        tint
        eyebrow="Up to 31 December 2025"
        title="The old tax brackets"
        intro="Before 2026, tax started at 7% on the first naira of taxable income, after a consolidated relief allowance of ₦200,000 (or 1% of gross income, if higher) plus 20% of gross income."
      >
        <DataTable
          caption="Nigeria personal income tax brackets up to 31 December 2025"
          head={['Annual taxable income', 'Rate', 'Total tax at top of band']}
          rows={bandRows(OLD_BANDS)}
        />
      </ContentSection>

      <ContentSection id="changes" eyebrow="Old law vs 2026" title="What changed, and what it means for your pay">
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong>A 0% band.</strong> The first ₦800,000 of taxable income is no longer taxed. Under the old
                brackets it was taxed at 7% to 15%.
              </li>
              <li>
                <strong>No consolidated relief allowance.</strong> The automatic allowance is gone. The 0% band and the
                new rent relief take its place.
              </li>
              <li>
                <strong>Rent relief.</strong> You can deduct 20% of your annual rent, up to ₦500,000.
              </li>
              <li>
                <strong>Wider bands, higher top rate.</strong> The 24% top rate used to start at ₦3.2 million of
                taxable income. The top rate is now 25%, and it starts at ₦50 million.
              </li>
            </ul>
          </Prose>
          <Prose>
            <p>
              The effect depends on what you earn. The table shows estimated annual tax on the same gross salary under
              both sets of rules, with pension and NHF deducted and no rent relief claimed.
            </p>
            <p>
              The lowest salaries pay clearly less. Through the middle of the range the two figures are close, and
              claiming rent relief brings the 2026 figure down further. The highest salaries pay more, because the
              allowance worth 20% of gross income is gone.
            </p>
          </Prose>
        </div>
        <div className="mt-10">
          <DataTable
            caption="Estimated annual tax by monthly salary under the old law and the 2026 bands"
            head={['Gross salary / month', 'Old law', '2026', 'Difference']}
            rows={COMPARE.map((m) => {
              const r = salaryFigures(m);
              const diff = r.tax - r.taxOld;
              return [
                <Link key={m} href={salaryHref(m)}>{naira(m)}</Link>,
                naira(r.taxOld),
                naira(r.tax),
                `${diff > 0 ? '+' : diff < 0 ? '– ' : ''}${naira(diff)}`,
              ];
            })}
          />
        </div>
      </ContentSection>

      <ContentSection id="faq" narrow eyebrow="Frequently asked" title="Tax band questions, answered">
        <Faq
          name="bands-faq"
          items={[
            {
              q: 'What is the tax-free threshold in Nigeria?',
              a: 'The first ₦800,000 of taxable income each year is taxed at 0%. It is a band, not an allowance: everyone gets it, and only income above it is taxed.',
            },
            {
              q: 'What was the old tax rate in Nigeria?',
              a: 'Up to the end of 2025 there were six brackets of 7%, 11%, 15%, 19%, 21% and 24%. The 24% rate applied to taxable income above ₦3.2 million a year.',
            },
            {
              q: 'Are the bands monthly or annual?',
              a: (
                <>
                  Annual. For monthly PAYE, your employer works out the tax on a full year&apos;s income and deducts
                  one-twelfth each month. The <Link href="/salary/">tax on salary</Link> page shows the monthly figures
                  for common salaries.
                </>
              ),
            },
            {
              q: 'Do freelancers and business owners use the same bands?',
              a: (
                <>
                  Individuals do. A freelancer or sole trader pays the same rates on profit after business expenses —
                  see the <Link href="/calculators/freelancer/">freelancer calculator</Link>. Companies are taxed
                  separately, under <Link href="/calculators/business/">Company Income Tax</Link>.
                </>
              ),
            },
            {
              q: 'What is the highest tax rate in Nigeria?',
              a: 'For individuals, 25% on taxable income above ₦50 million a year. Because lower slices are taxed at lower rates, the overall share of income paid in tax is always below 25%.',
            },
          ]}
        />
      </ContentSection>

      <CtaBand
        title="See which band your salary falls in"
        primary={{ label: 'Open the PAYE calculator', href: '/#calculator' }}
        secondary={{ label: 'Tax on common salaries', href: '/salary/' }}
      />
    </PageShell>
  );
}
