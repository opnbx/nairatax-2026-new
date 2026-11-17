import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { InvestmentCalc } from '@/components/calc/InvestmentCalc';

export const metadata = pageMetadata({
  title: `Investment & Capital Gains Tax Calculator Nigeria ${TAX_YEAR}`,
  description:
    'Estimate tax on dividends, interest and capital gains under the Nigeria Tax Act 2025. Dividends and interest carry 10% withholding tax; capital gains are taxed at your income-tax band.',
  path: '/calculators/investment/',
});

export default function InvestmentPage() {
  return (
    <PageShell variant="sub" page="Investment">
      <CalcHero
        eyebrow="Investors · dividends, interest & gains"
        title="Passive income, plainly taxed."
        sub="Dividends and interest carry 10% withholding tax, usually your final tax. Capital gains are added to your income and taxed at the progressive bands."
        stats={[
          { fig: '10% WHT', label: 'Dividends & interest' },
          { fig: '0%–25%', label: 'Capital gains' },
          { fig: 'Final', label: 'WHT usually settles it' },
        ]}
      >
        <InvestmentCalc />
      </CalcHero>

      <SupportSection
        eyebrow="How it's taxed"
        title="Three income types, two sets of rules"
        steps={[
          { idx: '10%', title: 'Dividends', body: 'Company dividends are subject to 10% withholding tax, deducted before the payment reaches you.' },
          { idx: '10%', title: 'Interest', body: 'Interest on savings, deposits and bonds is taxed at 10% withholding — usually your final liability.' },
          { idx: '0%–25%', title: 'Capital gains', body: 'Since 2026, an individual’s gains are taxed as income at the progressive bands, not a flat 10%. Share sales under ₦150M a year with gains up to ₦10M are exempt — not modelled here.' },
        ]}
      />

      <MoreCalculators current="Investment" />
    </PageShell>
  );
}
