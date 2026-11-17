import { PageShell } from '@/components/site/PageShell';
import { pageMetadata } from '@/lib/seo';
import { MoreCalculators } from '@/components/calc/ui';
import { ComingSoon } from '@/components/site/ComingSoon';

export const metadata = pageMetadata({
  title: 'Partnership Tax Calculator Nigeria',
  description:
    'Tax for partnerships and co-owned businesses under the Nigeria Tax Act 2025, including profit allocation and partner distributions. Coming soon.',
  path: '/calculators/partnership/',
  index: false,
});

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
