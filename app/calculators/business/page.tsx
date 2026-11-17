import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { BusinessCalc } from '@/components/calc/BusinessCalc';

export const metadata = pageMetadata({
  title: `Company Income Tax (CIT) Calculator Nigeria ${TAX_YEAR}`,
  description:
    'Estimate Company Income Tax (CIT) and the Development Levy under the Nigeria Tax Act 2025. Small companies pay 0%; everyone else pays 30% CIT plus a 4% levy.',
  path: '/calculators/business/',
});

export default function BusinessPage() {
  return (
    <PageShell variant="sub" page="Business">
      <CalcHero
        eyebrow="Companies · corporate income tax"
        title="Company tax, settled clearly."
        sub="Small companies pay nothing. Everyone else: 30% Company Income Tax plus a 4% Development Levy on profit."
        stats={[
          { fig: '≤₦50M · 0%', label: 'Small-company relief' },
          { fig: '30% CIT', label: 'Standard rate' },
          { fig: '+4%', label: 'Development Levy' },
        ]}
      >
        <BusinessCalc />
      </CalcHero>

      <SupportSection
        eyebrow="What applies"
        title="The corporate rules, in brief"
        steps={[
          { idx: '01', title: 'Small-company exemption', body: "Companies with turnover of ₦50 million or less and fixed assets up to ₦250 million pay 0% — provided they aren't professional-services firms." },
          { idx: '02', title: '30% + 4% for the rest', body: 'Other companies pay 30% Company Income Tax plus a 4% Development Levy, which replaced the Education Tax and other levies in 2026.' },
          { idx: '03', title: "Deduct before you're taxed", body: 'Allowable business expenses and capital allowances reduce the profit your tax is calculated on.' },
        ]}
      />

      <MoreCalculators current="Business" />
    </PageShell>
  );
}
