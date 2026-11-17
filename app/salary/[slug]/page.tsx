import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { ContentSection, CtaBand, DataTable, PageHero, Prose, RelatedLinks } from '@/components/content/blocks';
import { bandBreakdown, naira, pct } from '@/lib/tax-engine';
import {
  MONTHLY_SALARIES,
  salaryFigures,
  salaryFromSlug,
  salaryHref,
  salarySlug,
  shortNaira,
} from '@/lib/salary-pages';

type Props = { params: Promise<{ slug: string }> };

// Only the salaries in MONTHLY_SALARIES exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return MONTHLY_SALARIES.map((m) => ({ slug: salarySlug(m) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const monthly = salaryFromSlug(slug);
  if (!monthly) return {};
  const r = salaryFigures(monthly);
  return pageMetadata({
    title: `Tax on ${naira(monthly)} Monthly Salary in Nigeria (${TAX_YEAR} PAYE)`,
    description: `On a ${naira(monthly)} monthly salary (${naira(r.gross)} a year) you pay about ${naira(r.tax / 12)} PAYE a month and take home ${naira(r.takeHomeMonthly)} under the Nigeria Tax Act 2025. Full band-by-band breakdown.`,
    path: salaryHref(monthly),
  });
}

export default async function SalaryPage({ params }: Props) {
  const { slug } = await params;
  const monthly = salaryFromSlug(slug);
  if (!monthly) notFound();

  const r = salaryFigures(monthly);
  const bands = bandBreakdown(r.taxable).filter((b) => b.amount > 0);

  // Rent-relief illustration: annual rent equal to three months' gross pay.
  const rent = monthly * 3;
  const withRent = salaryFigures(monthly, rent);
  const rentSaving = r.tax - withRent.tax;

  const oldDiff = r.taxOld - r.tax;

  return (
    <PageShell variant="sub" section="Tax on salary" page={`${shortNaira(monthly)} a month`}>
      <PageHero
        eyebrow="PAYE on salary · 2026 rates"
        title={`Tax on a ${naira(monthly)} monthly salary in Nigeria`}
        sub={
          <>
            A gross salary of {naira(monthly)} a month ({naira(r.gross)} a year) carries about {naira(r.tax / 12)} of
            PAYE a month under the Nigeria Tax Act 2025. After pension and NHF, you take home about{' '}
            {naira(r.takeHomeMonthly)} a month.
          </>
        }
        stats={[
          { fig: naira(r.takeHomeMonthly), label: 'Take-home / month' },
          { fig: naira(r.tax / 12), label: 'PAYE / month' },
          { fig: pct(r.effective), label: 'Effective tax rate' },
        ]}
      />

      <ContentSection
        eyebrow="The breakdown"
        title={`What comes out of ${naira(monthly)} a month`}
        intro="Assumes the standard 8% pension and 2.5% NHF contributions, with no rent or life-insurance relief."
      >
        <DataTable
          caption={`Deductions and take-home pay on a gross salary of ${naira(monthly)} a month`}
          head={['', 'Per month', 'Per year']}
          rows={[
            ['Gross salary', naira(monthly), naira(r.gross)],
            ['Pension (8%)', `– ${naira(r.pension / 12)}`, `– ${naira(r.pension)}`],
            ['NHF (2.5%)', `– ${naira(r.nhf / 12)}`, `– ${naira(r.nhf)}`],
            ['PAYE tax', `– ${naira(r.tax / 12)}`, `– ${naira(r.tax)}`],
            ['Take-home pay', naira(r.takeHomeMonthly), naira(r.takeHome)],
          ]}
          highlight={4}
        />
      </ContentSection>

      <ContentSection
        tint
        eyebrow="Band by band"
        title={`How the ${naira(r.tax)} annual tax is worked out`}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Prose>
            <p>
              Tax is charged on taxable income, not gross pay. Taking the pension contribution of {naira(r.pension)} and
              NHF of {naira(r.nhf)} off the annual salary of {naira(r.gross)} leaves a taxable income of{' '}
              <strong>{naira(r.taxable)}</strong>.
            </p>
            <p>
              That income is then split across the 2026 bands. The first ₦800,000 is taxed at 0% and each slice above
              it at its own rate, which is why the tax is {pct(r.effective)} of the gross salary even though the top
              slice is taxed at {Math.round(bands[bands.length - 1].rate * 100)}%.
            </p>
            <p>
              See every band on the <Link href="/tax-bands/">2026 tax bands</Link> page.
            </p>
          </Prose>
          <DataTable
            caption={`Band-by-band PAYE on a taxable income of ${naira(r.taxable)}`}
            head={['Slice of taxable income', 'Rate', 'Tax']}
            rows={[
              ...bands.map((b) => [
                b.from === 0 ? `First ${naira(b.amount)}` : `Next ${naira(b.amount)}`,
                `${Math.round(b.rate * 100)}%`,
                naira(b.tax),
              ]),
              [`Total on ${naira(r.taxable)}`, '', naira(r.tax)],
            ]}
            highlight={bands.length}
          />
        </div>
      </ContentSection>

      <ContentSection eyebrow="Reliefs and the old law" title="What can change this figure">
        <div className="grid gap-10 md:grid-cols-2">
          <Prose>
            <h3 className="text-[17px] font-bold text-ink-heading">If you pay rent</h3>
            <p>
              Rent relief lets you deduct 20% of the rent you pay, up to ₦500,000 a year. With rent of {naira(rent)} a
              year, {naira(withRent.rentRelief)} comes off your taxable income and your PAYE falls from{' '}
              {naira(r.tax / 12)} to {naira(withRent.tax / 12)} a month — a saving of {naira(rentSaving)} a year.
            </p>
          </Prose>
          <Prose>
            <h3 className="text-[17px] font-bold text-ink-heading">Compared with the old law</h3>
            <p>
              Under the pre-2026 rates and consolidated relief allowance, the same salary carried an estimated{' '}
              {naira(r.taxOld)} of tax a year.{' '}
              {oldDiff > 0
                ? `The 2026 bands bring that down to ${naira(r.tax)} — about ${naira(oldDiff)} less.`
                : oldDiff < 0
                  ? `Under the 2026 bands it is ${naira(r.tax)} — about ${naira(-oldDiff)} more, before any rent relief.`
                  : `Under the 2026 bands it is the same.`}
            </p>
          </Prose>
        </div>
      </ContentSection>

      <RelatedLinks
        eyebrow="Other monthly salaries"
        links={MONTHLY_SALARIES.map((m) => ({
          label: shortNaira(m),
          href: salaryHref(m),
          active: m === monthly,
        }))}
      />

      <CtaBand
        title="Earn a different amount, or pay rent?"
        primary={{ label: 'Open the PAYE calculator', href: '/#calculator' }}
        secondary={{ label: 'All salary examples', href: '/salary/' }}
      />
    </PageShell>
  );
}
