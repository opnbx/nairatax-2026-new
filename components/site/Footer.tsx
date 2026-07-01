import Link from 'next/link';
import { Logo } from './Logo';

const DISCLAIMER =
  'Estimates only, not professional tax advice. Actual liability may vary — consult the Nigeria Revenue Service or a qualified professional.';

/** Footer. `variant="home"` is the 4-column layout; `variant="sub"` is slim. */
export function Footer({ variant = 'home' }: { variant?: 'home' | 'sub' }) {
  if (variant === 'sub') {
    return (
      <footer className="bg-navy-900 text-onnavy-1">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between lg:px-14">
          <Logo tone="navy" />
          <p className="max-w-xl text-[12.5px] leading-relaxed text-onnavy-3">
            {DISCLAIMER} <span className="whitespace-nowrap">© 2025–2026 NairaTax.ng</span>
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-navy-900 text-onnavy-1">
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo tone="navy" />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-onnavy-3">
              Free Nigerian tax estimators for employees, freelancers, businesses and investors under
              the Nigeria Tax Act 2025.
            </p>
          </div>

          <FooterColumn
            title="Quick links"
            links={[
              { label: 'Home', href: '/' },
              { label: 'All calculators', href: '/#calculators' },
              { label: 'FAQ', href: '/#faq' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
          <FooterColumn
            title="Calculators"
            links={[
              { label: 'Employee PAYE', href: '/' },
              { label: 'Freelancer', href: '/calculators/freelancer' },
              { label: 'Business', href: '/calculators/business' },
              { label: 'Investment', href: '/calculators/investment' },
            ]}
          />

          <div>
            <h3 className="eyebrow text-[11px] tracking-[0.16em] text-gold-onnavy">Contact</h3>
            <ul className="mt-4 space-y-2 text-[13.5px] text-onnavy-1">
              <li>
                <a href="mailto:webchief@nairatax.ng" className="hover:text-white">
                  webchief@nairatax.ng
                </a>
              </li>
              <li className="text-onnavy-3">
                Official guidance:{' '}
                <a
                  href="https://www.nrs.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  nrs.gov.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12.5px] text-onnavy-3 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl leading-relaxed">{DISCLAIMER}</p>
          <p className="whitespace-nowrap">© 2025–2026 NairaTax.ng</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow text-[11px] tracking-[0.16em] text-gold-onnavy">{title}</h3>
      <ul className="mt-4 space-y-2 text-[13.5px] text-onnavy-1">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
