import type { Metadata } from 'next';

export const SITE_URL = 'https://www.nairatax.ng';
export const SITE_NAME = 'NairaTax';
/** Tax year quoted in page titles. */
export const TAX_YEAR = 2026;
/** Share image (public/og.png), used for every page's social card. */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'NairaTax — free Nigerian tax calculators for the Nigeria Tax Act 2025',
};

/**
 * Per-page metadata. A page that sets `openGraph` replaces the root layout's
 * copy wholesale (image included), so the shared fields are repeated here to
 * keep every page's social tags pointing at itself rather than at the homepage.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  /** Without the brand suffix; the root layout's title template adds it (except on the homepage). */
  title: string;
  description: string;
  /** Canonical path with a trailing slash, e.g. `/calculators/usd/`. */
  path: string;
  /** False for placeholder pages that should stay out of search results. */
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_NG',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
