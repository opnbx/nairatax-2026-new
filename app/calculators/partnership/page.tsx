import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { MoreCalculators } from '@/components/calc/ui';
import { ComingSoon } from '@/components/site/ComingSoon';

export const metadata: Metadata = {
  title: 'Partnership Tax Calculator — NairaTax',
  description:
    'Tax for partnerships and co-owned businesses under the Nigeria Tax Act 2025, including profit allocation and partner distributions. Coming soon.',
  alternates: { canonical: '/calculators/partnership/' },
};

export default function PartnershipPage() {
  return (
    <PageShell variant="sub" page="Partnership">
      <ComingSoon
        eyebrow="Partners · co-owned businesses"
        title="Shared profits, split cleanly."
        intro="An estimator for partnerships — allocating profit between partners and applying each partner's personal tax bands."
        bullets={[
          'Profit allocation across partners by share',
          'Each partner taxed on their distribution at progressive personal rates',
          'Allowable partnership expenses deducted before tax',
        ]}
      />
      <MoreCalculators current="" />
    </PageShell>
  );
}
