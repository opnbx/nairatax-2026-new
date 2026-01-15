import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - NairaTax',
  description: 'Get in touch with NairaTax for questions about tax calculations, feedback, bug reports, or partnership inquiries.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
