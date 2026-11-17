import Link from 'next/link';

/**
 * Wordmark: a navy rounded tile with a gold ₦ glyph + "NairaTax" and a mono
 * sub-label. `tone="navy"` renders light text for use on dark footers.
 */
export function Logo({ tone = 'light' }: { tone?: 'light' | 'navy' }) {
  const wordColor = tone === 'navy' ? 'text-white' : 'text-navy-800';
  const subColor = tone === 'navy' ? 'text-onnavy-3' : 'text-muted-2';

  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="NairaTax home">
      <span
        className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-navy-800 font-serif text-[22px] font-bold text-gold-fill"
        aria-hidden="true"
      >
        ₦
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-sans text-[20px] font-bold ${wordColor}`}>NairaTax</span>
        <span className={`eyebrow mt-1 text-[10px] tracking-[0.16em] ${subColor}`}>PAYE ESTIMATOR</span>
      </span>
    </Link>
  );
}

/** Small gold rotated-square seal used in the top ribbon. */
export function SealDiamond() {
  return <span className="inline-block h-[6px] w-[6px] rotate-45 bg-gold-fill" aria-hidden="true" />;
}
