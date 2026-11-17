import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Only pages with a working calculator. The "coming soon" placeholders
// (pensioner, partnership) are noindexed and left out.
const CALCULATORS = ['freelancer', 'business', 'creator', 'investment', 'usd'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified },
    ...CALCULATORS.map((slug) => ({ url: `${SITE_URL}/calculators/${slug}/`, lastModified })),
    { url: `${SITE_URL}/contact/`, lastModified },
  ];
}
