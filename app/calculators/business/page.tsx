import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, TAX_YEAR } from '@/lib/seo';
import { CalcHero, SupportSection } from '@/components/calc/subpage';
import { MoreCalculators } from '@/components/calc/ui';
import { BusinessCalc } from '@/components/calc/BusinessCalc';
import Link from 'next/link';
import { CalcGuide } from '@/components/content/blocks';
import { computeBusiness, naira, pct } from '@/lib/tax-engine';

// Worked example: a trading company above the small-company thresholds.
const ex = computeBusiness({ turnover: '120000000', expenses: '90000000', type: 'general', assets: 'within' });

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

      <CalcGuide
        name="business-faq"
        title="How company income tax is calculated in Nigeria"
        intro="Company tax is charged on profit, not turnover. Turnover only decides whether the company counts as small."
        table={{
          caption: 'Worked example of Company Income Tax and Development Levy in Nigeria, 2026',
          head: ['', 'Per year'],
          rows: [
            ['Turnover', naira(ex.turnover)],
            ['Allowable expenses', `– ${naira(ex.expenses)}`],
            ['Taxable profit', naira(ex.profit)],
            ['Company Income Tax (30%)', naira(ex.cit)],
            ['Development Levy (4%)', naira(ex.levy)],
            ['Total tax', naira(ex.total)],
            ['Profit after tax', naira(ex.net)],
          ],
          highlight: 5,
        }}
        faqTitle="Company tax questions, answered"
        faqs={[
          {
            q: 'Which companies pay 0% company income tax?',
            a: 'Small companies: turnover of ₦50 million or less and fixed assets of no more than ₦250 million, provided the company is not a professional-services firm. The Act sets the turnover cap at ₦50 million but official guidance uses ₦100 million, so a company between the two should confirm its status with the NRS.',
          },
          {
            q: 'What is the Development Levy?',
            a: 'A 4% levy on a company’s assessable profit, introduced in 2026. It replaced the Tertiary Education Tax and several other levies. Small companies that qualify for 0% do not pay it.',
          },
          {
            q: 'Is company tax charged on turnover or profit?',
            a: 'On profit. Allowable business expenses and capital allowances come off turnover first, and the 30% rate and 4% levy apply to what is left.',
          },
          {
            q: 'Does a sole proprietor or business name pay company income tax?',
            a: (
              <>
                No. Company Income Tax applies to incorporated companies. A sole proprietor is taxed as an individual
                on business profit, at the personal bands — use the{' '}
                <Link href="/calculators/freelancer/">freelancer calculator</Link> instead.
              </>
            ),
          },
        ]}
      >
        <p>
          A trading company with turnover of {naira(ex.turnover)} and allowable expenses of {naira(ex.expenses)} has a
          taxable profit of <strong>{naira(ex.profit)}</strong>.
        </p>
        <p>
          Company Income Tax at 30% is {naira(ex.cit)} and the 4% Development Levy adds {naira(ex.levy)}, for a total
          of {naira(ex.total)} — {pct(ex.effective)} of profit.
        </p>
        <p>
          A company with turnover of ₦50 million or less and fixed assets up to ₦250 million would pay nothing on the
          same profit, unless it is a professional-services firm.
        </p>
      </CalcGuide>

      <MoreCalculators current="Business" />
    </PageShell>
  );
}
