import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { UsdCalc } from '@/components/calc/UsdCalc';

export const metadata: Metadata = {
  title: 'USD Income Tax Calculator — NairaTax',
  description:
    'Paid in US dollars? Convert your foreign-currency income to naira and estimate your PAYE take-home under the Nigeria Tax Act 2025.',
  alternates: { canonical: '/calculators/usd/' },
};

export default function UsdPage() {
  return (
    <PageShell variant="sub" page="USD income">
      <CalcHero
        eyebrow="Remote & foreign-paid · US dollars"
        title="Dollar income, taxed in naira."
        sub="Convert your USD earnings at today's rate and see your PAYE take-home under Nigeria's 2026 tax regime — the same reliefs apply."
        stats={[
          { fig: '₦/$1', label: 'Your own rate' },
          { fig: '0%–25%', label: 'Progressive rates' },
          { fig: '₦800K', label: 'Tax-free first' },
        ]}
      >
        <UsdCalc />
      </CalcHero>

      <SupportSection
        eyebrow="How it works"
        title="From dollars to take-home"
        steps={[
          { idx: '01', title: 'Convert at your rate', body: 'Enter the naira-per-dollar rate you actually receive; your gross is converted before any tax is applied.' },
          { idx: '02', title: 'Same PAYE reliefs', body: 'Pension (8%) and NHF (2.5%) are deducted automatically, and rent relief applies just as for naira salaries.' },
          { idx: '03', title: 'Progressive bands', body: 'The first ₦800,000 is tax-free, then 15%–25% applies to the balance of your converted income.' },
        ]}
      />

      <MoreCalculators current="USD income" />
    </PageShell>
  );
}
