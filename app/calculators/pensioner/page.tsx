import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { MoreCalculators } from '@/components/calc/ui';
import { ComingSoon } from '@/components/site/ComingSoon';

export const metadata: Metadata = {
  title: 'Pensioner Tax Calculator — NairaTax',
  description:
    'Tax in retirement under the Nigeria Tax Act 2025: pensions paid under the Pension Reform Act are exempt, other income is taxed at the standard bands. Coming soon.',
  alternates: { canonical: '/calculators/pensioner/' },
};

export default function PensionerPage() {
  return (
    <PageShell variant="sub" page="Pensioner">
      <ComingSoon
        eyebrow="Retirees · pension & gratuity"
        title="Retirement income, clearly sorted."
        intro="A dedicated estimator for retirees — separating exempt pension income from the income that is still taxed."
        bullets={[
          'Pensions and gratuities paid under the Pension Reform Act — exempt from income tax',
          'Other income in retirement (rent, investments, part-time work) at the standard bands',
          'Lump-sum retirement benefits',
        ]}
      />
      <MoreCalculators current="" />
    </PageShell>
  );
}
