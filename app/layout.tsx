import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NairaTax - Free Nigerian Tax Calculator 2025 | Employee PAYE, Business, Freelancer',
  description: 'Calculate your Nigerian employee tax (PAYE), freelancer tax, business tax, and more. Free calculators for all taxpayers under Nigeria Tax Act 2025. New ₦800,000 tax-free threshold.',
  metadataBase: new URL('https://www.nairatax.ng'),
  keywords: 'Nigerian tax calculator, PAYE calculator Nigeria, employee tax Nigeria, Nigeria tax 2025, freelancer tax, business tax calculator, Nigeria Tax Act 2025',
  openGraph: {
    title: 'NairaTax - Free Nigerian Tax Calculator 2025',
    description: 'Calculate your Nigerian taxes accurately. Free PAYE calculator and more under Nigeria Tax Act 2025.',
    url: 'https://www.nairatax.ng',
    siteName: 'NairaTax',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NairaTax - Free Nigerian Tax Calculator 2025',
    description: 'Calculate your Nigerian taxes accurately. Free PAYE calculator and more under Nigeria Tax Act 2025.',
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
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NairaTax - Nigerian Tax Calculator",
              "description": "Free Nigerian tax calculators for employees (PAYE), freelancers, business owners, content creators, and investors",
              "url": "https://www.nairatax.ng",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "NGN"
              },
              "featureList": [
                "Employee PAYE calculator",
                "Freelancer tax calculator",
                "Business CIT calculator",
                "Content creator tax",
                "Investment income tax"
              ]
            })
          }}
        />

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
        <SpeedInsights />
      </body>
    </html>
  );
}