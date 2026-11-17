import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { IncomeCalculator, type IncomeLabels } from '@/components/calc/IncomeCalculator';
import { CalcGuide } from '@/components/content/blocks';
import { bandBreakdown, computeFreelancer, naira, pct } from '@/lib/tax-engine';

// Worked example: ₦8m of payouts and brand deals, ₦2m of production costs.
const ex = computeFreelancer({ amount: '8000000', period: 'annual', expenses: '2000000', wht: '' });
const exBands = bandBreakdown(ex.profit).filter((b) => b.amount > 0);

export const metadata = pageMetadata({
  title: `Content Creator Tax Calculator Nigeria ${TAX_YEAR}`,
  description:
    'Estimate tax on YouTube, Instagram and TikTok income under the Nigeria Tax Act 2025. Deduct production and equipment costs and credit any tax already withheld.',
  path: '/calculators/creator/',
});

const labels: IncomeLabels = {
  cardTitle: 'Content creator calculator',
  cardSub: 'Creator income · 2026 rates',
  incomeLabel: 'Platform income',
  expensesLabel: 'Production & equipment (annual)',
  expensesHelper: 'Cameras, lighting, editing, data, studio, props',
  whtLabel: 'Tax already withheld (optional)',
  whtHelper: 'Withheld by agencies or platforms',
  costsWord: 'costs',
  whtMiddle: 'already withheld',
  empty: 'Enter your payouts to see your net earnings after gear and tax.',
};

export default function CreatorPage() {
  return (
    <PageShell variant="sub" page="Creator">
      <CalcHero
        eyebrow="Creator economy · YouTube, IG, TikTok"
        title="Creator payouts, properly counted."
        sub="Ad revenue, brand deals and tips are taxable income — but your gear, editing and production costs come off first."
        stats={[
          { fig: 'Gear', label: 'Fully deductible' },
          { fig: '0%–25%', label: 'Progressive rates' },
          { fig: '₦800K', label: 'Tax-free first' },
        ]}
      >
        <IncomeCalculator labels={labels} />
      </CalcHero>

      <SupportSection
        eyebrow="What counts"
        title="Treating your channel like a business"
        steps={[
          { idx: '01', title: 'All payouts are income', body: 'AdSense, brand partnerships, tips, subscriptions and affiliate income all count toward your taxable total.' },
          { idx: '02', title: 'Gear reduces the bill', body: 'Cameras, lighting, editing software, data, studio rent and props are deductible production costs.' },
          { idx: '03', title: 'Keep clean records', body: 'Save invoices and receipts. Tax withheld by agencies or platforms credits against what you finally owe.' },
        ]}
      />

      <CalcGuide
        name="creator-faq"
        title="How content creator income is taxed in Nigeria"
        intro="Creator income is business income: you are taxed on what is left after production costs, at the 2026 personal bands."
        table={{
          caption: 'Worked example of income tax for a content creator in Nigeria, 2026',
          head: ['', 'Per year'],
          rows: [
            ['Platform payouts and brand deals', naira(ex.income)],
            ['Production and equipment costs', `– ${naira(ex.expenses)}`],
            ['Taxable profit', naira(ex.profit)],
            ['Income tax', naira(ex.tax)],
            ['Kept after costs and tax', naira(ex.net)],
          ],
          highlight: 4,
        }}
        faqTitle="Creator tax questions, answered"
        faqs={[
          {
            q: 'Is YouTube, TikTok or Instagram income taxable in Nigeria?',
            a: 'Yes. If you live in Nigeria, ad revenue, brand partnerships, tips, subscriptions and affiliate income are all taxable, including money paid to you from abroad.',
          },
          {
            q: 'I am paid in dollars. How do I work out my tax?',
            a: 'Convert each payout to naira at the rate you actually received, add them up for the year and enter the naira total as your platform income.',
          },
          {
            q: 'What can a content creator deduct?',
            a: 'Costs incurred wholly and exclusively to make your content: cameras, lighting, editing software, data, studio rent, props and paid collaborators. Keep receipts for everything you claim.',
          },
          {
            q: 'Do small creators pay tax?',
            a: 'Only on profit above ₦800,000 a year. If your payouts less your production costs come to ₦800,000 or less, the 0% band covers all of it.',
          },
        ]}
      >
        <p>
          A creator who earns {naira(ex.income)} in a year from payouts and brand deals, and spends{' '}
          {naira(ex.expenses)} on gear and production, is taxed on a profit of <strong>{naira(ex.profit)}</strong>.
        </p>
        <p>
          Spread across the bands —{' '}
          {exBands.map((b) => `${naira(b.amount)} at ${Math.round(b.rate * 100)}%`).join(', ')} — that is income tax
          of {naira(ex.tax)}, or {pct(ex.effective)} of total earnings.
        </p>
      </CalcGuide>

      <MoreCalculators current="Content creator" />
    </PageShell>
  );
}
