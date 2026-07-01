import type { Metadata } from 'next';
import Script from 'next/script';
import { Source_Serif_4, Libre_Franklin, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
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
      <body className="antialiased font-sans bg-white text-ink-body">
        {children}
      </body>
    </html>
  );
}