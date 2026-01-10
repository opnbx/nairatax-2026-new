import type { Metadata } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: 'NairaTax - Free Nigerian Tax Calculator 2025',
  description: 'Calculate your Nigerian taxes accurately under Nigeria Tax Act 2025',
  metadataBase: new URL('https://www.nairatax.ng'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className="antialiased">
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}
      </body>
    </html>
  );
}
