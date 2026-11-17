'use client';

import { useState } from 'react';
import { computeBusiness, naira, pct, type CompanyType, type FixedAssets } from '@/lib/tax-engine';
import {
  BAR,
  CalcCard,
  Callout,
  EmptyResult,
  FieldLabel,
  MoneyInput,
  ResultHero,
  ResultPanel,
  SegmentedToggle,
  SplitBar,
  StatGrid,
} from './ui';

/** Company Income Tax calculator (CIT + Development Levy, small-company exemption). */
export function BusinessCalc() {
  const [turnover, setTurnover] = useState('1000000');
  const [expenses, setExpenses] = useState('');
  const [type, setType] = useState<CompanyType>('general');
  const [assets, setAssets] = useState<FixedAssets>('within');

  const res = computeBusiness({ turnover, expenses, type, assets });

  return (
    <CalcCard title="Company income tax calculator" sub="CIT + Development Levy · 2026 rates">
      <div className="grid lg:grid-cols-[0.82fr_1fr]">
        <div className="space-y-4 border-hairline-2 p-6 lg:border-r">
          <div>
            <FieldLabel htmlFor="turnover">Annual turnover</FieldLabel>
            <div className="mt-2">
              <MoneyInput id="turnover" value={turnover} onChange={setTurnover} helper="Total revenue for the year" />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="expenses">Allowable expenses <span className="font-normal text-muted-3">(annual)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="expenses" value={expenses} onChange={setExpenses} helper="Turnover minus expenses = taxable profit" />
            </div>
          </div>

          <div>
            <span className="block text-[13px] font-semibold text-ink-body">Company type</span>
            <div className="mt-2">
              <SegmentedToggle
                value={type}
                onChange={setType}
                ariaLabel="Company type"
                options={[
                  { value: 'general', label: 'General trade' },
                  { value: 'professional', label: 'Professional' },
                ]}
              />
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-3">
              Professional services (legal, medical, consulting) don&apos;t qualify for the small-company 0%.
            </p>
          </div>

          <div>
            <span className="block text-[13px] font-semibold text-ink-body">Total fixed assets</span>
            <div className="mt-2">
              <SegmentedToggle
                value={assets}
                onChange={setAssets}
                ariaLabel="Total fixed assets"
                options={[
                  { value: 'within', label: 'Up to ₦250M' },
                  { value: 'above', label: 'Above ₦250M' },
                ]}
              />
            </div>
          </div>
        </div>

        <ResultPanel>
          {!res.filled ? (
            <EmptyResult>Enter turnover to see your net profit and company tax due.</EmptyResult>
          ) : (
            <div className="space-y-5">
              <ResultHero
                eyebrow="Net profit after tax"
                value={naira(res.net)}
                sub={`on ${naira(res.profit)} taxable profit`}
              />
              <StatGrid
                cells={[
                  { label: 'CIT (30%)', value: naira(res.cit) },
                  { label: 'Dev. levy (4%)', value: naira(res.levy) },
                  { label: 'Total tax', value: naira(res.total) },
                ]}
              />
              <SplitBar
                segments={[
                  { label: 'Net profit', pct: res.bar.net, color: BAR.net },
                  { label: 'CIT', pct: res.bar.cit, color: BAR.tax },
                  { label: 'Development Levy', pct: res.bar.levy, color: BAR.ded },
                ]}
              />
              {res.exempt ? (
                <Callout tone="green">
                  <span className="mr-1 font-bold">✓</span>
                  Exempt. Small companies — turnover up to ₦50M, fixed assets up to ₦250M, not professional services — pay 0% company tax.
                </Callout>
              ) : (
                <Callout tone="gold">
                  Effective tax on profit is <span className="font-bold text-[#F4E6B8]">{pct(res.effective)}</span> — 30% CIT plus the 4% Development Levy.
                  {res.borderline &&
                    ' The Act sets the small-company cap at ₦50M turnover, but official guidance uses ₦100M — you may qualify for 0%. Confirm with the NRS.'}
                </Callout>
              )}
            </div>
          )}
        </ResultPanel>
      </div>
    </CalcCard>
  );
}
