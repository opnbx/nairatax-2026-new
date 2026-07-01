import Link from 'next/link';
import { Logo } from './Logo';

function TaxActPill() {
  return (
    <span className="eyebrow rounded-[7px] border border-[#D8C6A0] px-2.5 py-1.5 text-[10px] leading-tight tracking-[0.14em] text-gold-light">
      Tax Act 2025
    </span>
  );
}

/**
 * Site header. `variant="home"` shows the primary nav; `variant="sub"` shows a
 * breadcrumb + "All calculators" back link for calculator pages.
 */
export function Header({
  variant = 'home',
  page,
}: {
  variant?: 'home' | 'sub';
  page?: string;
}) {
  return (
    <header className="border-b border-hairline bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-5 lg:px-14">
        <Logo />

        {variant === 'home' ? (
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Primary">
            <Link href="/#calculators" className="hidden text-[15px] text-ink-body2 hover:text-navy-800 sm:inline">
              Calculators
            </Link>
            <Link href="/#brackets" className="hidden text-[15px] text-ink-body2 hover:text-navy-800 sm:inline">
              Tax brackets
            </Link>
            <Link href="/#faq" className="hidden text-[15px] text-ink-body2 hover:text-navy-800 sm:inline">
              FAQ
            </Link>
            <TaxActPill />
          </nav>
        ) : (
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="eyebrow hidden text-[10.5px] tracking-[0.14em] text-muted-2 md:inline">
              Calculators / {page}
            </span>
            <Link
              href="/"
              className="text-[14px] text-ink-body2 hover:text-navy-800"
            >
              ← All calculators
            </Link>
            <TaxActPill />
          </div>
        )}
      </div>
    </header>
  );
}
