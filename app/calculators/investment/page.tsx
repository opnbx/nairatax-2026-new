import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { InvestmentCalc } from '@/components/calc/InvestmentCalc';
import { CalcGuide } from '@/components/content/blocks';
import { computeInvestment, naira } from '@/lib/tax-engine';

// Worked example: an investor with ₦4m of other taxable income.
const EX = { div: 500000, interest: 200000, gains: 1000000, other: 4000000 };
const ex = computeInvestment({
  div: String(EX.div),
  interest: String(EX.interest),
  gains: String(EX.gains),
  other: String(EX.other),
});
const exAmounts: Record<string, number> = {
  Dividends: EX.div,
  Interest: EX.interest,
  'Capital gains': EX.gains,
};

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

      <CalcGuide
        name="investment-faq"
        title="How investment income is taxed in Nigeria"
        intro="Dividends and interest are taxed at source. Capital gains are added to your other income and taxed at the bands."
        table={{
          caption: 'Worked example of tax on dividends, interest and capital gains in Nigeria, 2026',
          head: ['Income', 'Amount', 'Tax'],
          rows: [
            ...ex.breakdown.map((row) => [`${row.label} (${row.note})`, naira(exAmounts[row.label]), naira(row.tax)]),
            ['Total', naira(ex.total), naira(ex.totalTax)],
          ],
          highlight: ex.breakdown.length,
        }}
        faqTitle="Investment tax questions, answered"
        faqs={[
          {
            q: 'Is the 10% tax on dividends final?',
            a: 'Usually, yes. The company withholds 10% before paying you, and for most individual investors that settles the tax on the dividend. The same applies to the 10% withheld on interest.',
          },
          {
            q: 'How are capital gains taxed from 2026?',
            a: 'An individual’s gains are no longer taxed at a flat 10%. They are added on top of your other taxable income for the year and taxed at the progressive bands, so the rate depends on how much else you earn.',
          },
          {
            q: 'Are any share sales exempt?',
            a: 'Yes. Share sales of under ₦150 million in a year, with gains of up to ₦10 million, are exempt. This calculator does not apply that exemption, so leave exempt gains out.',
          },
          {
            q: 'Do I need to declare investment income?',
            a: 'Tax on dividends and interest is withheld for you. Tax on capital gains is not, so gains are declared in your annual return.',
          },
        ]}
      >
        <p>
          An investor with {naira(EX.other)} of other taxable income receives {naira(EX.div)} in dividends and{' '}
          {naira(EX.interest)} in interest, and makes a {naira(EX.gains)} gain on an asset sale.
        </p>
        <p>
          The dividends and interest have 10% withheld at source, {naira(ex.whtTax)} in all. The gain sits on top of
          the other income, which puts it in the {Math.round((ex.gainsTax / EX.gains) * 100)}% band and adds {naira(ex.gainsTax)}.
        </p>
        <p>
          Total tax on the {naira(ex.total)} of investment income is <strong>{naira(ex.totalTax)}</strong>.
        </p>
      </CalcGuide>

      <MoreCalculators current="Investment" />
    </PageShell>
  );
}
