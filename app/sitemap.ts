import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { MONTHLY_SALARIES, salaryHref } from '@/lib/salary-pages';

// Only pages with a working calculator. The "coming soon" placeholders
// (pensioner, partnership) are noindexed and left out.
const CALCULATORS = ['freelancer', 'business', 'creator', 'investment', 'usd'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified },
    ...CALCULATORS.map((slug) => ({ url: `${SITE_URL}/calculators/${slug}/`, lastModified })),
    { url: `${SITE_URL}/salary/`, lastModified },
    { url: `${SITE_URL}/tax-bands/`, lastModified },
    ...MONTHLY_SALARIES.map((m) => ({ url: `${SITE_URL}${salaryHref(m)}`, lastModified })),
    { url: `${SITE_URL}/contact/`, lastModified },
  ];
}
