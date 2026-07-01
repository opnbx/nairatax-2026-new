import Link from 'next/link';
import { Eyebrow, SealTile } from '@/components/calc/ui';

/** Restyled "under development" placeholder for calculators not yet built. */
export function ComingSoon({
  eyebrow,
  title,
  intro,
  bullets,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
}) {
  return (
    <>
      <section className="tx-security">
        <div className="mx-auto max-w-[1280px] px-6 pb-28 pt-14 lg:px-14">
          <Eyebrow tone="navy">{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-onnavy-1">{intro}</p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-[820px] px-6 pb-16 lg:px-14">
        <div className="rounded-calc bg-white p-8 shadow-calc ring-1 ring-hairline sm:p-10">
          <div className="flex items-center gap-3">
            <SealTile size={40} />
            <span className="eyebrow rounded-[6px] bg-tint px-2.5 py-1 text-[10.5px] tracking-[0.12em] text-gold-light">
              In development
            </span>
          </div>
          <h2 className="mt-6 font-serif text-[24px] font-bold text-ink-heading">Coming soon</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            We&apos;re building this estimator to the same 2026 standard as the rest of the suite.
            In the meantime, here&apos;s what it will cover:
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-ink-body">
                <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] bg-navy-800 text-[11px] text-gold-fill" aria-hidden="true">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="rounded-btn bg-navy-800 px-6 py-3 text-center text-[14px] font-semibold text-white transition-opacity hover:opacity-90">
              ← Back to home
            </Link>
            <Link href="/#calculators" className="rounded-btn border border-inputborder px-6 py-3 text-center text-[14px] font-semibold text-ink-body2 transition-colors hover:border-navy-800 hover:text-navy-800">
              View other calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
