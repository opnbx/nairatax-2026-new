import Link from 'next/link';
import { Eyebrow, SectionHeading } from '@/components/calc/ui';

/**
 * Server-rendered content blocks shared by the guides, the salary pages and
 * the explanatory sections under each calculator. Everything here ships in the
 * initial HTML — nothing is hidden behind client state.
 */

/** Navy hero for a content page (no calculator card). */
export function PageHero({
  eyebrow,
  title,
  sub,
  stats,
}: {
  eyebrow: string;
  title: string;
  sub: React.ReactNode;
  stats?: { fig: string; label: string }[];
}) {
  return (
    <section className="tx-security">
      <div className="mx-auto max-w-[1280px] px-6 pb-14 pt-14 lg:px-14">
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[46px]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-onnavy-1">{sub}</p>
        {stats && (
          <div className="mt-8 grid max-w-2xl gap-y-3 border-t border-white/[0.13] pt-6 sm:grid-cols-3 sm:gap-4">
            {/* Phones: one stat per row, label left and figure right. From sm up: three columns. */}
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 sm:block">
                <p className="order-2 font-serif text-[20px] font-bold leading-none text-white sm:text-[23px]">{s.fig}</p>
                <p className="order-1 text-[12.5px] text-onnavy-3 sm:mt-1.5 sm:text-[11.5px]">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** A titled band of body content. `tint` gives the pale-blue surface. */
export function ContentSection({
  id,
  eyebrow,
  title,
  intro,
  tint = false,
  narrow = false,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tint?: boolean;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-hairline ${tint ? 'bg-tint' : ''}`}>
      <div className={`mx-auto px-6 py-[60px] lg:px-14 ${narrow ? 'max-w-[920px]' : 'max-w-[1280px]'}`}>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/** Body copy: readable measure, spaced paragraphs, styled inline links. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-body [&_a]:font-medium [&_a]:text-gold-light [&_a:hover]:underline [&_strong]:font-semibold [&_strong]:text-ink-heading">
      {children}
    </div>
  );
}

/**
 * Real <table> with the navy header used across the site. The first column is
 * the row header; the rest are right-aligned figures.
 */
export function DataTable({
  caption,
  head,
  rows,
  highlight,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
  /** Index of a row to emphasise (e.g. a total). */
  highlight?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-hairline-3 bg-white">
      <table className={`w-full border-collapse text-left text-[13.5px] sm:text-[14px] ${head.length > 3 ? 'min-w-[560px]' : ''}`}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-navy-800">
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`eyebrow px-3.5 py-3 text-[10.5px] tracking-[0.12em] text-onnavy-3 sm:px-5 ${i > 0 ? 'text-right' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-t border-hairline-3 ${ri === highlight ? 'bg-[rgba(199,162,76,0.08)]' : ''}`}
            >
              {row.map((cell, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="px-3.5 py-3.5 font-medium sm:px-5 text-ink-heading [&_a]:text-gold-light [&_a:hover]:underline">
                    {cell}
                  </th>
                ) : (
                  <td key={ci} className={`whitespace-nowrap px-3.5 py-3.5 text-right font-mono sm:px-5 ${ri === highlight ? 'font-semibold text-ink-heading' : 'text-ink-body'}`}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

/**
 * Accordion built on <details>, so every answer is in the HTML whether or not
 * it is expanded. `name` makes the group exclusive (one open at a time).
 */
export function Faq({ items, name = 'faq' }: { items: FaqItem[]; name?: string }) {
  return (
    <div className="border-t border-hairline">
      {items.map((f, i) => (
        <details key={f.q} name={name} open={i === 0} className="group border-b border-hairline">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-[16px] font-semibold text-ink-heading">{f.q}</h3>
            <span
              aria-hidden="true"
              className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[6px] border border-hairline text-[18px] text-ink-body2"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">–</span>
            </span>
          </summary>
          <div className="pb-5 pr-10 text-[14.5px] leading-relaxed text-muted [&_a]:font-medium [&_a]:text-gold-light [&_a:hover]:underline">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Closing navy band pointing back to a calculator. */
export function CtaBand({
  eyebrow = 'Your own numbers',
  title,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="tx-security">
      <div className="mx-auto max-w-[1280px] px-6 py-[60px] text-center lg:px-14">
        <Eyebrow tone="navy" className="text-center">{eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-[28px] font-bold leading-[1.12] tracking-[-0.01em] text-white sm:text-[31px]">
          {title}
        </h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="rounded-btn bg-gold-fill px-6 py-3 text-[14px] font-bold text-navy-800 transition-opacity hover:opacity-90">
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="rounded-btn border border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/5">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Explanatory block under a calculator: a worked example (copy + table) and a
 * short FAQ. Gives each calculator page indexable content of its own.
 */
export function CalcGuide({
  title,
  intro,
  table,
  faqTitle,
  faqs,
  name,
  children,
}: {
  title: string;
  intro?: string;
  table: { caption: string; head: string[]; rows: React.ReactNode[][]; highlight?: number };
  faqTitle: string;
  faqs: FaqItem[];
  /** Unique accordion group name for this page. */
  name: string;
  /** Prose explaining the worked example. */
  children: React.ReactNode;
}) {
  return (
    <>
      <ContentSection tint eyebrow="Worked example" title={title} intro={intro}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Prose>{children}</Prose>
          <DataTable {...table} />
        </div>
      </ContentSection>
      <ContentSection narrow eyebrow="Frequently asked" title={faqTitle}>
        <Faq items={faqs} name={name} />
      </ContentSection>
    </>
  );
}

/** Pill links to related pages, matching the "More calculators" strip. */
export function RelatedLinks({
  eyebrow,
  links,
}: {
  eyebrow: string;
  links: { label: string; href: string; active?: boolean }[];
}) {
  return (
    <section className="border-t border-hairline bg-tint">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.map((l) =>
            l.active ? (
              <span key={l.href} className="rounded-full bg-navy-800 px-4 py-2 text-[13px] font-semibold text-white">
                {l.label}
              </span>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-inputborder bg-white px-4 py-2 text-[13px] font-medium text-ink-body2 transition-colors hover:border-navy-800 hover:text-navy-800"
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
