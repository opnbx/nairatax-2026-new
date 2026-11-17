import { PageShell } from '@/components/site/PageShell';
import { pageMetadata, SITE_NAME, TAX_YEAR } from '@/lib/seo';
import { HomeContent } from '@/components/home/HomeContent';
import { FAQS } from '@/components/home/faqs';

export const metadata = pageMetadata({
  // The layout's title template doesn't apply to the root page, so the brand is added here.
  title: `PAYE Calculator Nigeria ${TAX_YEAR} — Take-Home Pay & Tax | ${SITE_NAME}`,
  description:
    'Free Nigeria tax calculator for 2026. Enter your salary to see your PAYE and take-home pay under the Nigeria Tax Act 2025 — pension, NHF, rent relief and the ₦800,000 tax-free threshold included.',
  path: '/',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  return (
    <PageShell variant="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeContent />
    </PageShell>
  );
}
