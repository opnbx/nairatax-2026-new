import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { BusinessCalc } from '@/components/calc/BusinessCalc';

export const metadata: Metadata = {
  title: 'Company Income Tax Calculator — NairaTax',
  description:
    'Estimate Company Income Tax (CIT) and Education Tax under the Nigeria Tax Act 2025. Small companies with turnover ≤ ₦50M pay 0%; everyone else pays 30% + 2%.',
  alternates: { canonical: '/calculators/business/' },
};

export default function BusinessPage() {
  return (
    <PageShell variant="sub" page="Business">
      <CalcHero
        eyebrow="Companies · corporate income tax"
        title="Company tax, settled clearly."
        sub="Small companies under ₦50M pay nothing. Everyone else: 30% Company Income Tax plus a 2% Education Tax on profit."
        stats={[
          { fig: '≤₦50M · 0%', label: 'Small-company relief' },
          { fig: '30% CIT', label: 'Standard rate' },
          { fig: '+2%', label: 'Education Tax' },
        ]}
      >
        <BusinessCalc />
      </CalcHero>

      <SupportSection
        eyebrow="What applies"
        title="The corporate rules, in brief"
        steps={[
          { idx: '01', title: 'Small-company exemption', body: "Companies with turnover of ₦50 million or less pay 0% — provided they aren't professional-services firms." },
          { idx: '02', title: '30% + 2% for the rest', body: 'Larger companies pay 30% Company Income Tax plus a 2% Education Tax, both assessed on taxable profit.' },
          { idx: '03', title: "Deduct before you're taxed", body: 'Allowable business expenses and capital allowances reduce the profit your tax is calculated on.' },
        ]}
      />

      <MoreCalculators current="Business" />
    </PageShell>
  );
}
