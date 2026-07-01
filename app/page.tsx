import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { HomeContent } from '@/components/home/HomeContent';

export const metadata: Metadata = {
  title: 'NairaTax — Employee PAYE Calculator | Nigeria Tax Act 2025',
  description:
    'See exactly what you keep. Estimate your 2026 take-home pay and PAYE under the Nigeria Tax Act 2025 — reliefs, bands and the new ₦800,000 tax-free threshold accounted for.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <PageShell variant="home">
      <HomeContent />
    </PageShell>
  );
}
