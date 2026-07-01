import { Eyebrow } from './ui';

/** Navy hero for a calculator sub-page, with the calc card overlapping below. */
export function CalcHero({
  eyebrow,
  title,
  sub,
  stats,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  stats: { fig: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="tx-security">
        <div className="mx-auto max-w-[1280px] px-6 pb-28 pt-14 lg:px-14">
          <Eyebrow tone="navy">{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[46px]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-onnavy-1">{sub}</p>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/[0.13] pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[22px] font-bold leading-none text-white">{s.fig}</p>
                <p className="mt-1.5 text-[11.5px] text-onnavy-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="relative z-10 mx-auto -mt-20 max-w-[1280px] px-6 pb-16 lg:px-14">{children}</div>
    </>
  );
}

/** Numbered supporting section shared by the calculator sub-pages. */
export function SupportSection({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: { idx: string; title: string; body: string }[];
}) {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-serif text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-ink-heading">
          {title}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.idx} className="border-t-2 border-navy-800 pt-5">
              <span className="font-mono text-[12px] text-gold-light">{s.idx}</span>
              <h3 className="mt-2 text-[17px] font-bold text-ink-heading">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
