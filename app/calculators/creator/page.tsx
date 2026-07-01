import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { IncomeCalculator, type IncomeLabels } from '@/components/calc/IncomeCalculator';

export const metadata: Metadata = {
  title: 'Content Creator Tax Calculator — NairaTax',
  description:
    'Estimate tax on YouTube, Instagram and TikTok income under the Nigeria Tax Act 2025. Deduct production and equipment costs and credit any tax already withheld.',
  alternates: { canonical: '/calculators/creator/' },
};

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

      <MoreCalculators current="Content creator" />
    </PageShell>
  );
}
