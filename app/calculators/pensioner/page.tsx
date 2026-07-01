import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { MoreCalculators } from '@/components/calc/ui';
import { ComingSoon } from '@/components/site/ComingSoon';

export const metadata: Metadata = {
  title: 'Pensioner Tax Calculator — NairaTax',
  description:
    'Tax on pension income and retirement benefits under the Nigeria Tax Act 2025, including the extra ₦200,000 allowance for pensioners. Coming soon.',
  alternates: { canonical: '/calculators/pensioner/' },
};

export default function PensionerPage() {
  return (
    <PageShell variant="sub" page="Pensioner">
      <ComingSoon
        eyebrow="Retirees · pension & gratuity"
        title="Pension income, gently taxed."
        intro="A dedicated estimator for pensioners — accounting for the extra tax-free allowance retirees receive under the 2026 law."
        bullets={[
          'Pension income taxed with the extra ₦200,000 pensioner allowance (₦1,000,000 tax-free)',
          'Gratuity and lump-sum retirement benefits',
          'Senior-citizen reliefs and exemptions',
        ]}
      />
      <MoreCalculators current="" />
    </PageShell>
  );
}
