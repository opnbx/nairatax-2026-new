'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('config', gaId, { page_path: pathname + searchParams.toString() });
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
