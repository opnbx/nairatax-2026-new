'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  computeEmployee,
  naira,
  pct,
  BRACKET_ROWS,
  type Period,
} from '@/lib/tax-engine';
import {
  CalcCard,
  Callout,
  Eyebrow,
  FieldLabel,
  MoneyInput,
  NoteBox,
  ResultHero,
  ResultPanel,
  EmptyResult,
  SectionHeading,
  SegmentedToggle,
  SplitBar,
  StatGrid,
  BAR,
} from '@/components/calc/ui';

const FEATURES = [
  { title: '₦800,000 tax-free', body: 'The first ₦800,000 of annual income is completely exempt — up from just ₦200,000 before.' },
  { title: 'Lower headline rates', body: 'Progressive bands from 0% to 25% mean most salaried employees owe less than they did in 2025.' },
  { title: 'New rent relief', body: 'Deduct 20% of your annual rent, capped at ₦500,000 — a brand-new relief introduced for 2026.' },
  { title: 'Every relief counted', body: 'Pension, NHF, NHIS and life-insurance premiums are all deducted before your tax is assessed.' },
];

const CALCS = [
  { idx: '01', title: 'Freelancer', href: '/calculators/freelancer', desc: 'Self-employed income tax with full business-expense deductions for consultants and contractors.', tags: ['Business expenses', 'Progressive rates', 'Self-assessment'] },
  { idx: '02', title: 'Business', href: '/calculators/business', desc: 'Company Income Tax at 30% plus 2% Education Tax. Companies earning ≤₦50M pay 0%.', tags: ['CIT 30%', 'Education 2%', 'Small-co 0%'] },
  { idx: '03', title: 'Content creator', href: '/calculators/creator', desc: 'For YouTube, Instagram and TikTok earnings, with platform-specific deductions built in.', tags: ['Platform income', 'Equipment', 'Production'] },
  { idx: '04', title: 'Investment', href: '/calculators/investment', desc: 'Dividends, interest and capital gains with withholding tax handled automatically.', tags: ['Dividend WHT 10%', 'Interest WHT 10%', 'CGT 10%'] },
];

const FAQS = [
  { q: 'What is the tax-free threshold?', a: 'The first ₦800,000 of annual income is completely tax-free. If you earn ₦800,000 or less, you pay zero income tax. This takes effect on 1 January 2026.' },
  { q: 'What are the 2026 tax rates?', a: 'Progressive rates apply: 0% on the first ₦800,000, then 15%, 18%, 21%, 23% and finally 25% on income above ₦50 million.' },
  { q: 'How does rent relief work?', a: 'You can deduct 20% of the annual rent you pay, up to a maximum of ₦500,000. This is a new benefit introduced under the 2026 law.' },
  { q: 'What can employees deduct?', a: 'Pension (8%), NHF (2.5%), NHIS, life-insurance premiums and rent relief (20%, up to ₦500,000) are all deducted before tax is calculated.' },
  { q: 'What extra benefit do pensioners get?', a: 'Pensioners receive an additional ₦200,000 tax-free allowance on top of the standard threshold — effectively ₦1,000,000 tax-free.' },
  { q: 'When does this take effect?', a: 'The Nigeria Tax Act 2025 has been signed into law, and the new rates apply from 1 January 2026 when the Nigeria Revenue Service takes over collection.' },
];

export function HomeContent() {
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<Period>('annual');
  const [rent, setRent] = useState('');
  const [ins, setIns] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const res = computeEmployee({ amount, period, rent, ins });

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="tx-security">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 pb-[74px] pt-[66px] lg:grid-cols-[0.88fr_1.12fr] lg:px-14">
          <div>
            <Eyebrow tone="navy">PAYE estimate · Nigeria Tax Act 2025</Eyebrow>
            <h1 className="mt-4 font-serif text-[40px] font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-[54px]">
              See exactly what you keep.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-onnavy-1">
              A precise, up-to-date estimate of your take-home pay and PAYE under Nigeria&apos;s 2026
              tax regime — reliefs, bands and thresholds accounted for.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.13] pt-6">
              {[
                { fig: '₦800,000', label: 'Tax-free threshold' },
                { fig: '0%–25%', label: 'Progressive rates' },
                { fig: '1 Jan 2026', label: 'Effective date' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-[23px] font-bold leading-none text-white">{s.fig}</p>
                  <p className="mt-1.5 text-[12px] text-onnavy-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator card */}
          <div id="calculator" className="scroll-mt-24">
            <CalcCard title="Employee PAYE calculator" sub="Annual & monthly · 2026 rates">
              <div className="grid lg:grid-cols-[0.82fr_1fr]">
                {/* Inputs */}
                <div className="space-y-4 border-hairline-2 p-6 lg:border-r">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <FieldLabel>Gross salary</FieldLabel>
                      <SegmentedToggle
                        value={period}
                        onChange={setPeriod}
                        ariaLabel="Salary frequency"
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'annual', label: 'Annual' },
                        ]}
                      />
                    </div>
                    <div className="mt-2">
                      <MoneyInput id="gross-salary" value={amount} onChange={setAmount} ariaLabel="Gross salary" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                      <FieldLabel>Annual rent <span className="font-normal text-muted-3">(optional)</span></FieldLabel>
                      <div className="mt-2">
                        <MoneyInput id="annual-rent" value={rent} onChange={setRent} ariaLabel="Annual rent" helper="20% relief · capped at ₦500,000" />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Life insurance <span className="font-normal text-muted-3">(optional)</span></FieldLabel>
                      <div className="mt-2">
                        <MoneyInput id="life-insurance" value={ins} onChange={setIns} ariaLabel="Life insurance premium" helper="Annual premium · max 20% of gross" />
                      </div>
                    </div>
                  </div>

                  <NoteBox>Pension (8%) and NHF (2.5%) are deducted automatically before tax.</NoteBox>
                </div>

                {/* Result */}
                <ResultPanel>
                  {!res.filled ? (
                    <EmptyResult>Enter your gross salary to see your monthly take-home and full tax breakdown.</EmptyResult>
                  ) : (
                    <div className="space-y-5">
                      <ResultHero
                        eyebrow="Monthly take-home"
                        value={naira(res.takeHomeMonthly)}
                        sub={`from ${naira(res.grossMonthly)} gross per month`}
                      />
                      <StatGrid
                        cells={[
                          { label: 'Annual tax', value: naira(res.tax) },
                          { label: 'Eff. rate', value: pct(res.effective), gold: true },
                          { label: 'Net / year', value: naira(res.takeHome) },
                        ]}
                      />
                      <SplitBar
                        segments={[
                          { label: 'Take-home', pct: res.bar.takeHome, color: BAR.net },
                          { label: 'Tax', pct: res.bar.tax, color: BAR.tax },
                          { label: 'Deductions', pct: res.bar.deductions, color: BAR.ded },
                        ]}
                      />
                      {res.hasSavings && (
                        <Callout tone="gold">
                          ↓ About <span className="font-bold text-[#F4E6B8]">{naira(res.savings)}</span> less tax per year than under the old law.
                        </Callout>
                      )}
                    </div>
                  )}
                </ResultPanel>
              </div>
            </CalcCard>
          </div>
        </div>
      </section>

      {/* ---------------- What changed ---------------- */}
      <section className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-14">
        <SectionHeading eyebrow="What changed in 2026" title="Reforms that put more in your pocket" />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-t-2 border-navy-800 pt-5">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-navy-800 text-[15px] text-gold-fill" aria-hidden="true">✓</span>
              <h3 className="mt-4 text-[16.5px] font-bold text-ink-heading">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Other calculators ---------------- */}
      <section id="calculators" className="scroll-mt-20 border-t border-hairline">
        <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-14">
          <SectionHeading
            eyebrow="Other calculators"
            title="Not a salaried employee?"
            intro="Specialised estimators for freelancers, businesses, creators and investors — each with the reliefs that apply to them."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CALCS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex flex-col rounded-card border border-hairline-3 bg-white p-5 transition-all duration-150 hover:-translate-y-[3px] hover:border-navy-800 hover:shadow-cardhover"
              >
                <span className="font-mono text-[12px] text-muted-2">{c.idx}</span>
                <h3 className="mt-3 text-[17px] font-bold text-ink-heading">{c.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted">{c.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-[5px] bg-tint px-2 py-1 font-mono text-[10.5px] text-ink-body2">{t}</span>
                  ))}
                </div>
                <span className="eyebrow mt-4 inline-flex items-center gap-1 text-[11px] tracking-[0.12em] text-gold-light">
                  Open calculator →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-[13.5px] text-muted">
            Also available:{' '}
            <Link href="/calculators/usd" className="font-medium text-gold-light hover:underline">USD income</Link>
            {' · '}
            <Link href="/calculators/pensioner" className="font-medium text-gold-light hover:underline">Pensioner</Link>
            {' · '}
            <Link href="/calculators/partnership" className="font-medium text-gold-light hover:underline">Partnership</Link>
          </p>
        </div>
      </section>

      {/* ---------------- Tax brackets ---------------- */}
      <section id="brackets" className="scroll-mt-20 bg-tint">
        <div className="mx-auto max-w-[1280px] px-6 py-[60px] lg:px-14">
          <SectionHeading eyebrow="2025 tax brackets" title="How the bands stack up" intro="Rates apply to taxable income after pension, NHF and reliefs — effective 1 January 2026." />
          <div className="mt-8 overflow-hidden rounded-card border border-hairline-3 bg-white">
            <div className="grid grid-cols-[2.3fr_0.8fr_1.5fr] bg-navy-800 px-5 py-3">
              <span className="eyebrow text-[10.5px] tracking-[0.12em] text-onnavy-3">Annual income band</span>
              <span className="eyebrow text-[10.5px] tracking-[0.12em] text-onnavy-3">Rate</span>
              <span className="eyebrow text-right text-[10.5px] tracking-[0.12em] text-onnavy-3">Tax on this band</span>
            </div>
            {BRACKET_ROWS.map((b, i) => {
              const active = res.filled && res.marginalIdx === i;
              return (
                <div
                  key={b.range}
                  className={`grid grid-cols-[2.3fr_0.8fr_1.5fr] items-center border-t border-hairline-3 px-5 py-3.5 text-[14px] ${active ? 'bg-[rgba(199,162,76,0.08)]' : ''}`}
                >
                  <span className="flex items-center gap-2 font-medium text-ink-heading">
                    {b.range}
                    {active && (
                      <span className="eyebrow rounded-[5px] bg-gold-fill px-1.5 py-0.5 text-[9px] tracking-[0.1em] text-navy-800">
                        Your band
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-ink-body">{b.rate}</span>
                  <span className="text-right font-mono text-muted">{b.on}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="scroll-mt-20">
        <div className="mx-auto max-w-[820px] px-6 py-[60px] lg:px-14">
          <SectionHeading eyebrow="Frequently asked" title="Questions, answered" />
          <div className="mt-8 border-t border-hairline">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[16px] font-semibold text-ink-heading">{f.q}</span>
                    <span className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[6px] border border-hairline text-[18px] text-ink-body2">
                      {open ? '–' : '+'}
                    </span>
                  </button>
                  {open && <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-muted">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="tx-security">
        <div className="mx-auto max-w-[1280px] px-6 py-[60px] text-center lg:px-14">
          <Eyebrow tone="navy" className="text-center">Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-xl font-serif text-[30px] font-bold leading-[1.12] tracking-[-0.01em] text-white sm:text-[31px]">
            Estimate your 2026 take-home in seconds
          </h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#calculator" className="rounded-btn bg-gold-fill px-6 py-3 text-[14px] font-bold text-navy-800 transition-opacity hover:opacity-90">
              Calculate employee tax
            </a>
            <Link href="/calculators/freelancer" className="rounded-btn border border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/5">
              View other calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
