import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { IncomeCalculator, type IncomeLabels } from '@/components/calc/IncomeCalculator';

export const metadata: Metadata = {
  title: 'Freelancer Tax Calculator — NairaTax',
  description:
    'Estimate your self-employed tax under the Nigeria Tax Act 2025. Deduct business expenses, credit the 5% WHT your clients withhold, and see your net income.',
  alternates: { canonical: '/calculators/freelancer/' },
};

const labels: IncomeLabels = {
  cardTitle: 'Freelancer tax calculator',
  cardSub: 'Self-assessment · 2026 rates',
  incomeLabel: 'Freelance income',
  expensesLabel: 'Business expenses (annual)',
  expensesHelper: 'Equipment, data, software, travel, workspace',
  whtLabel: 'Tax withheld by clients (5% WHT)',
  whtHelper: 'Credits against your final tax bill',
  costsWord: 'expenses',
  whtMiddle: 'withheld by clients',
  empty: 'Enter your income to see your net earnings and tax due after expenses.',
};

export default function FreelancerPage() {
  return (
    <PageShell variant="sub" page="Freelancer">
      <CalcHero
        eyebrow="Self-employed · consultants & contractors"
        title="Freelance income, fairly taxed."
        sub="Deduct your business expenses, credit the 5% withholding tax your clients already deducted, and see exactly what you owe."
        stats={[
          { fig: '5% WHT', label: 'Credited to you' },
          { fig: '0%–25%', label: 'Progressive rates' },
          { fig: 'Expenses', label: 'Fully deductible' },
        ]}
      >
        <IncomeCalculator labels={labels} />
      </CalcHero>

      <SupportSection
        eyebrow="How it works"
        title="Self-assessment, made simple"
        steps={[
          { idx: '01', title: 'Deduct real expenses', body: 'Only your profit is taxed. Equipment, data, software, travel and workspace all come off the top.' },
          { idx: '02', title: 'Credit your WHT', body: "The 5% clients withhold isn't lost — it credits against your final bill, so you pay less or get a refund." },
          { idx: '03', title: 'Same progressive bands', body: 'The first ₦800,000 of profit is tax-free, then 15%–25% applies just as it does for employees.' },
        ]}
      />

      <MoreCalculators current="Freelancer" />
    </PageShell>
  );
}
