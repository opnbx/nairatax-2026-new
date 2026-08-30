import Link from 'next/link';

/* ---------------------------------------------------------------- */
/* Typographic bits                                                  */
/* ---------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = 'light',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'light' | 'navy';
  className?: string;
}) {
  const color = tone === 'navy' ? 'text-gold-onnavy' : 'text-gold-eyebrow';
  return (
    <p className={`eyebrow text-[11px] tracking-[0.16em] ${color} ${className}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className = '',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-serif text-[30px] font-bold leading-[1.12] tracking-[-0.01em] text-ink-heading sm:text-[31px]">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

/** Gold rounded tile holding the ₦ seal glyph. */
export function SealTile({ size = 34 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[8px] bg-gold-soft font-serif font-bold text-gold-light"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      ₦
    </span>
  );
}

export function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-[7px] w-[7px] rounded-full bg-pos" aria-hidden="true" />
      <span className="eyebrow text-[11px] tracking-[0.14em] text-pos">Live</span>
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Calculator card                                                   */
/* ---------------------------------------------------------------- */

export function CalcCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-calc bg-white shadow-calc ring-1 ring-hairline">
      <div className="flex items-center justify-between gap-3 border-b border-hairline-2 px-6 py-4">
        <div className="flex items-center gap-3">
          <SealTile />
          <div>
            <p className="text-[16.5px] font-bold text-ink-heading">{title}</p>
            <p className="eyebrow mt-0.5 text-[10px] tracking-[0.14em] text-muted-2">{sub}</p>
          </div>
        </div>
        <LiveDot />
      </div>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Inputs                                                            */
/* ---------------------------------------------------------------- */

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-ink-body">
      {children}
    </label>
  );
}

export function SegmentedToggle<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="inline-flex rounded-[8px] bg-tint p-1"
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`eyebrow rounded-[7px] px-3 py-1.5 text-[11px] tracking-[0.05em] transition-all duration-150 ${
              active ? 'bg-navy-800 text-white' : 'text-[#6B7788] hover:text-navy-800'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function MoneyInput({
  id,
  value,
  onChange,
  placeholder = '0',
  helper,
  prefix = '₦',
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: React.ReactNode;
  prefix?: string;
}) {
  // The accessible name comes from the associated <FieldLabel htmlFor={id}>.
  return (
    <div>
      <div className="flex items-center rounded-input border border-inputborder bg-white focus-within:border-navy-800">
        <span className="pl-3.5 pr-1 font-mono text-[15px] text-muted-2" aria-hidden="true">
          {prefix}
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 pr-3.5 font-mono text-[17px] text-ink-heading outline-none placeholder:text-placeholder"
        />
      </div>
      {helper && <p className="mt-1.5 text-[12px] text-muted-3">{helper}</p>}
    </div>
  );
}

/** Soft note box for auto-deduction copy. */
export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-input bg-fieldsoft px-3.5 py-3 text-[12.5px] leading-relaxed text-muted">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Result panel bits (rendered on navy weave)                        */
/* ---------------------------------------------------------------- */

export function ResultPanel({ children }: { children: React.ReactNode }) {
  return <div className="tx-weave px-6 py-6 sm:px-7">{children}</div>;
}

export function EmptyResult({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 text-center">
      <SealTile size={40} />
      <p className="max-w-[220px] text-[14px] leading-relaxed text-onnavy-2">{children}</p>
    </div>
  );
}

export function ResultHero({
  eyebrow,
  value,
  sub,
}: {
  eyebrow: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <Eyebrow tone="navy" className="text-[11px]">
        {eyebrow}
      </Eyebrow>
      <p className="mt-2 font-serif text-[46px] font-bold leading-none tracking-[-0.015em] text-white">
        {value}
      </p>
      {sub && <p className="mt-2 text-[13px] text-onnavy-3">{sub}</p>}
    </div>
  );
}

export function StatGrid({
  cells,
}: {
  cells: { label: string; value: string; gold?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] bg-white/10">
      {cells.map((c) => (
        <div key={c.label} className="min-w-0 bg-navy-800 px-2.5 py-3">
          <p className="eyebrow truncate text-[9.5px] tracking-[0.09em] text-onnavy-3">{c.label}</p>
          <p
            className={`mt-1.5 truncate font-mono text-[13.5px] font-bold leading-tight tracking-tight ${
              c.gold ? 'text-gold-onnavy' : 'text-white'
            }`}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SplitBar({
  segments,
}: {
  segments: { label: string; pct: number; color: string }[];
}) {
  return (
    <div>
      <div className="flex h-[10px] w-full overflow-hidden rounded-[6px] bg-white/10">
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-[11px] text-onnavy-2">
            <span
              className="h-[8px] w-[8px] rounded-[2px]"
              style={{ background: s.color }}
              aria-hidden="true"
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Bar segment colors (shared with the data-bar tokens). */
export const BAR = {
  net: '#5C7CB0',
  tax: '#C7A24C',
  ded: '#AEB8C6',
};

export function Callout({
  tone = 'gold',
  children,
}: {
  tone?: 'gold' | 'green';
  children: React.ReactNode;
}) {
  const styles =
    tone === 'green'
      ? 'border-[rgba(31,138,91,0.42)] bg-[rgba(31,138,91,0.14)] text-pos-onnavy'
      : 'border-[rgba(199,162,76,0.38)] bg-[rgba(199,162,76,0.13)] text-[#EAD9A6]';
  return (
    <div className={`rounded-[8px] border px-3.5 py-3 text-[13px] leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* More-calculators pill row (sub-pages)                             */
/* ---------------------------------------------------------------- */

const ALL_CALCS = [
  { label: 'Freelancer', href: '/calculators/freelancer/' },
  { label: 'Business', href: '/calculators/business/' },
  { label: 'Content creator', href: '/calculators/creator/' },
  { label: 'Investment', href: '/calculators/investment/' },
];

export function MoreCalculators({ current }: { current: string }) {
  return (
    <section className="border-t border-hairline bg-tint">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-14">
        <Eyebrow>More calculators</Eyebrow>
        <div className="mt-4 flex flex-wrap gap-3">
          {ALL_CALCS.map((c) => {
            const active = c.label === current;
            return active ? (
              <span
                key={c.label}
                className="rounded-full bg-navy-800 px-4 py-2 text-[13px] font-semibold text-white"
              >
                {c.label}
              </span>
            ) : (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-full border border-inputborder bg-white px-4 py-2 text-[13px] font-medium text-ink-body2 transition-colors hover:border-navy-800 hover:text-navy-800"
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
