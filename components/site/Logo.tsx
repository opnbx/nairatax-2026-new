import Link from 'next/link';

/**
 * Wordmark: a navy rounded tile with a gold ₦ glyph + "NairaTax" and a mono
 * sub-label. `tone="navy"` renders light text for use on dark footers.
 */
export function Logo({
  sublabel = 'PAYE ESTIMATOR',
  tone = 'light',
  href = '/',
}: {
  sublabel?: string;
  tone?: 'light' | 'navy';
  href?: string;
}) {
  const wordColor = tone === 'navy' ? 'text-white' : 'text-navy-800';
  const subColor = tone === 'navy' ? 'text-onnavy-3' : 'text-muted-2';

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="NairaTax home">
      <span
        className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-navy-800 font-serif text-[22px] font-bold text-gold-fill"
        aria-hidden="true"
      >
        ₦
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-sans text-[20px] font-bold ${wordColor}`}>NairaTax</span>
        <span className={`eyebrow mt-1 text-[10px] tracking-[0.16em] ${subColor}`}>{sublabel}</span>
      </span>
    </Link>
  );
}

/** Small gold rotated-square seal used before headings and inside cards. */
export function SealDiamond({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-[7px] w-[7px] rotate-45 bg-gold-fill ${className}`}
      aria-hidden="true"
    />
  );
}
