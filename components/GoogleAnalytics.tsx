'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

/**
 * WARNING: This component is NOT currently used in the app.
 * Google Analytics is initialized in app/layout.tsx instead.
 * DO NOT import this component without removing the GA initialization from layout.tsx
 * to prevent double-initialization and duplicate event tracking.
 *
 * This file is kept for potential future use with client-side navigation tracking.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const search = searchParams.toString();
      const page_path = search ? `${pathname}?${search}` : pathname;
      window.gtag('config', gaId, { page_path });
    }
  }, [pathname, searchParams, gaId]);

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `,
      }} />
    </>
  );
}
