import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact NairaTax — Questions & Feedback',
  description:
    'Contact NairaTax with questions about a tax calculation, feedback on the estimators, bug reports, or partnership inquiries.',
  alternates: { canonical: '/contact/' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
