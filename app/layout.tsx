import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'NairaTax - Free Nigerian Tax Calculator 2025',
  description: 'Calculate your Nigerian taxes accurately under Nigeria Tax Act 2025',
  metadataBase: new URL('https://www.nairatax.ng'),
  keywords: 'Nigerian tax calculator, PAYE calculator, employee tax Nigeria, business tax, freelancer tax',
  openGraph: {
    title: 'NairaTax - Free Nigerian Tax Calculator 2025',
    description: 'Calculate your Nigerian taxes accurately under Nigeria Tax Act 2025',
    url: 'https://www.nairatax.ng',
    siteName: 'NairaTax',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NairaTax - Free Nigerian Tax Calculator 2025',
    description: 'Calculate your Nigerian taxes accurately under Nigeria Tax Act 2025',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}