import { PageShell } from '@/components/site/PageShell';
import { pageMetadata } from '@/lib/seo';
import { Eyebrow } from '@/components/calc/ui';

export const metadata = pageMetadata({
  title: 'Contact — Questions & Feedback',
  description:
    'Contact NairaTax with questions about a tax calculation, feedback on the estimators, bug reports, or partnership inquiries.',
  path: '/contact/',
});

const EMAIL = 'webchief@nairatax.ng';

const TOPICS = [
  { label: 'Ask about a tax calculation', subject: 'Question about a tax calculation' },
  { label: 'Give feedback on the calculators', subject: 'Feedback on the calculators' },
  { label: 'Report a bug', subject: 'Bug report' },
  { label: 'Partnership inquiry', subject: 'Partnership inquiry' },
];

export default function ContactPage() {
  return (
    <PageShell variant="sub" page="Contact">
      <section className="tx-security">
        <div className="mx-auto max-w-[1280px] px-6 pb-28 pt-14 lg:px-14">
          <Eyebrow tone="navy">Get in touch</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px]">
            Questions or feedback?
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-onnavy-1">
            Found a bug, have a question about a calculation, or want to suggest an estimator? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-[820px] px-6 pb-16 lg:px-14">
        <div className="rounded-calc bg-white p-7 shadow-calc ring-1 ring-hairline sm:p-10">
          <h2 className="text-[18px] font-bold text-ink-heading">Email us</h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 inline-block font-mono text-[17px] text-gold-light hover:underline"
          >
            {EMAIL}
          </a>

          <h3 className="eyebrow mt-8 text-[11px] tracking-[0.16em] text-gold-eyebrow">Start an email about</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((t) => (
              <li key={t.subject}>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}`}
                  className="flex items-center justify-between gap-3 rounded-input border border-inputborder px-4 py-3 text-[14.5px] font-medium text-ink-body2 transition-colors hover:border-navy-800 hover:text-navy-800"
                >
                  {t.label}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-input bg-fieldsoft px-3.5 py-3 text-[12.5px] leading-relaxed text-muted">
            <strong className="text-ink-body">Please note:</strong> NairaTax provides estimates for
            educational purposes only. For professional advice, consult a qualified tax advisor or
            the Nigeria Revenue Service.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
