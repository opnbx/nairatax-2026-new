'use client';

import { useState } from 'react';
import { computeInvestment, naira, pct } from '@/lib/tax-engine';
import {
  CalcCard,
  Callout,
  EmptyResult,
  FieldLabel,
  MoneyInput,
  ResultHero,
  ResultPanel,
  StatGrid,
} from './ui';

/** Investment-income calculator: dividends, interest, capital gains at a flat 10%. */
export function InvestmentCalc() {
  const [div, setDiv] = useState('1000000');
  const [interest, setInterest] = useState('');
  const [gains, setGains] = useState('');

  const res = computeInvestment({ div, interest, gains });

  return (
    <CalcCard title="Investment income calculator" sub="WHT & capital gains · 2026">
      <div className="grid lg:grid-cols-[0.82fr_1fr]">
        <div className="space-y-4 border-hairline-2 p-6 lg:border-r">
          <div>
            <FieldLabel htmlFor="dividends">Dividends received <span className="font-normal text-muted-3">(annual)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="dividends" value={div} onChange={setDiv} helper="Taxed at 10% withholding" />
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="interest">Interest income <span className="font-normal text-muted-3">(annual)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="interest" value={interest} onChange={setInterest} helper="Savings & bonds — taxed at 10%" />
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="gains">Capital gains <span className="font-normal text-muted-3">(annual)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="gains" value={gains} onChange={setGains} helper="Profit on asset sales — CGT 10%" />
            </div>
          </div>
        </div>

        <ResultPanel>
          {!res.filled ? (
            <EmptyResult>Enter your income to see your net returns after tax.</EmptyResult>
          ) : (
            <div className="space-y-5">
              <ResultHero
                eyebrow="Net investment income"
                value={naira(res.net)}
                sub={`from ${naira(res.total)} total income`}
              />
              <StatGrid
                cells={[
                  { label: 'Total tax', value: naira(res.totalTax) },
                  { label: 'Eff. rate', value: pct(res.effective), gold: true },
                  { label: 'Net income', value: naira(res.net) },
                ]}
              />
              <div className="divide-y divide-white/10 rounded-[8px] bg-white/[0.04]">
                {res.breakdown.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-3.5 py-2.5">
                    <span className="text-[13px] text-onnavy-1">
                      {row.label} <span className="text-onnavy-3">· {row.note}</span>
                    </span>
                    <span className="font-mono text-[13px] text-white">{naira(row.tax)}</span>
                  </div>
                ))}
              </div>
              <Callout tone="green">
                <span className="mr-1 font-bold">✓</span>
                Dividend &amp; interest WHT is usually your final tax — nothing further to pay.
              </Callout>
            </div>
          )}
        </ResultPanel>
      </div>
    </CalcCard>
  );
}
