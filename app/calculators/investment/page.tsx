import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { InvestmentCalc } from '@/components/calc/InvestmentCalc';

export const metadata: Metadata = {
  title: 'Investment Income Tax Calculator — NairaTax',
  description:
    'Estimate tax on dividends, interest and capital gains under the Nigeria Tax Act 2025. Each is taxed at a flat 10%, usually withheld at source as your final tax.',
  alternates: { canonical: '/calculators/investment/' },
};

export default function InvestmentPage() {
  return (
    <PageShell variant="sub" page="Investment">
      <CalcHero
        eyebrow="Investors · dividends, interest & gains"
        title="Passive income, plainly taxed."
        sub="Dividends, interest and capital gains are each taxed at a flat 10% — usually withheld at source as your final tax."
        stats={[
          { fig: '10% WHT', label: 'Dividends & interest' },
          { fig: '10% CGT', label: 'Capital gains' },
          { fig: 'Final', label: 'Usually settled' },
        ]}
      >
        <InvestmentCalc />
      </CalcHero>

      <SupportSection
        eyebrow="How it's taxed"
        title="Three income types, one simple rate"
        steps={[
          { idx: '10%', title: 'Dividends', body: 'Company dividends are subject to 10% withholding tax, deducted before the payment reaches you.' },
          { idx: '10%', title: 'Interest', body: 'Interest on savings, deposits and bonds is taxed at 10% withholding — usually your final liability.' },
          { idx: '10%', title: 'Capital gains', body: 'Profit from selling shares, property or other assets is charged Capital Gains Tax at 10% of the gain.' },
        ]}
      />

      <MoreCalculators current="Investment" />
    </PageShell>
  );
}
