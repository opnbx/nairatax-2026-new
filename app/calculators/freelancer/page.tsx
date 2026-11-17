import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { IncomeCalculator, type IncomeLabels } from '@/components/calc/IncomeCalculator';
import { CalcGuide } from '@/components/content/blocks';
import { bandBreakdown, computeFreelancer, naira, pct } from '@/lib/tax-engine';

// Worked example: ₦6m of invoices, ₦1.2m of costs, 5% withheld by clients.
const ex = computeFreelancer({ amount: '6000000', period: 'annual', expenses: '1200000', wht: '300000' });
const exBands = bandBreakdown(ex.profit).filter((b) => b.amount > 0);

export const metadata = pageMetadata({
  title: `Freelancer Tax Calculator Nigeria ${TAX_YEAR}`,
  description:
    'Estimate your self-employed tax under the Nigeria Tax Act 2025. Deduct business expenses, credit the 5% WHT your clients withhold, and see your net income.',
  path: '/calculators/freelancer/',
});

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

      <CalcGuide
        name="freelancer-faq"
        title="How freelancer tax is calculated in Nigeria"
        intro="Self-employed people are taxed on profit — income less business expenses — at the same 2026 bands as employees."
        table={{
          caption: 'Worked example of income tax for a freelancer in Nigeria, 2026',
          head: ['', 'Per year'],
          rows: [
            ['Freelance income', naira(ex.income)],
            ['Business expenses', `– ${naira(ex.expenses)}`],
            ['Taxable profit', naira(ex.profit)],
            ['Income tax on profit', naira(ex.tax)],
            ['5% WHT already withheld by clients', `– ${naira(ex.wht)}`],
            ['Balance left to pay', naira(ex.balance)],
          ],
          highlight: 5,
        }}
        faqTitle="Freelancer tax questions, answered"
        faqs={[
          {
            q: 'Do freelancers pay PAYE in Nigeria?',
            a: 'No. PAYE is deducted by an employer from a salary. Freelancers, consultants and contractors are taxed by self-assessment on their profit for the year, at the same progressive rates.',
          },
          {
            q: 'What expenses can a freelancer deduct?',
            a: 'Costs incurred wholly and exclusively for your work: equipment, software, data, travel to clients and workspace. Personal spending is not deductible, so keep invoices and receipts for anything you claim.',
          },
          {
            q: 'What is the 5% withholding tax on my invoices?',
            a: 'A business client may withhold 5% of your fee and pay it to the tax authority in your name. It is an advance payment of your own income tax, not an extra tax, and it is credited against your bill at the end of the year.',
          },
          {
            q: 'Is the first ₦800,000 tax-free for freelancers?',
            a: 'Yes. The 0% band applies to the first ₦800,000 of profit, so a freelancer whose profit for the year is ₦800,000 or less pays no income tax.',
          },
        ]}
      >
        <p>
          A freelancer who invoices {naira(ex.income)} in a year and spends {naira(ex.expenses)} on the business is
          taxed on a profit of <strong>{naira(ex.profit)}</strong>.
        </p>
        <p>
          That profit is spread across the bands —{' '}
          {exBands.map((b) => `${naira(b.amount)} at ${Math.round(b.rate * 100)}%`).join(', ')} — for income tax of{' '}
          {naira(ex.tax)}, or {pct(ex.effective)} of what was invoiced.
        </p>
        <p>
          Clients who withheld 5% have already paid {naira(ex.wht)} of that, so {naira(ex.balance)} is left to settle
          on self-assessment.
        </p>
      </CalcGuide>

      <MoreCalculators current="Freelancer" />
    </PageShell>
  );
}
