'use client';

import { useState } from 'react';
import { computeEmployee, naira, pct, parseNaira, type Period } from '@/lib/tax-engine';
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

/** USD-denominated income converted to NGN, then taxed under the employee PAYE rules. */
export function UsdCalc() {
  const [usd, setUsd] = useState('');
  const [period, setPeriod] = useState<Period>('monthly');
  const [rate, setRate] = useState('1550');
  const [rent, setRent] = useState('');

  const usdNum = parseNaira(usd);
  const rateNum = parseNaira(rate);
  const grossNgn = (period === 'monthly' ? usdNum * 12 : usdNum) * rateNum;
  const res = computeEmployee({ amount: String(grossNgn), period: 'annual', rent, ins: '' });
  const filled = usdNum > 0 && rateNum > 0 && res.filled;

  return (
    <CalcCard title="USD income calculator" sub="Foreign-currency PAYE · 2026 rates">
      <div className="grid lg:grid-cols-[0.82fr_1fr]">
        <div className="space-y-4 border-hairline-2 p-6 lg:border-r">
          <div>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel>USD income</FieldLabel>
              <SegmentedToggle
                value={period}
                onChange={setPeriod}
                ariaLabel="Income frequency"
                options={[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'annual', label: 'Annual' },
                ]}
              />
            </div>
            <div className="mt-2">
              <MoneyInput id="usd" value={usd} onChange={setUsd} ariaLabel="USD income" helper="Paid in US dollars" />
            </div>
          </div>
          <div>
            <FieldLabel>Exchange rate <span className="font-normal text-muted-3">(₦ per $1)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="rate" value={rate} onChange={setRate} ariaLabel="Exchange rate" helper="Naira received per US dollar" />
            </div>
          </div>
          <div>
            <FieldLabel>Annual rent <span className="font-normal text-muted-3">(optional)</span></FieldLabel>
            <div className="mt-2">
              <MoneyInput id="rent" value={rent} onChange={setRent} ariaLabel="Annual rent" helper="20% relief · capped at ₦500,000" />
            </div>
          </div>
        </div>

        <ResultPanel>
          {!filled ? (
            <EmptyResult>Enter your USD income and exchange rate to see your take-home in naira.</EmptyResult>
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
              <Callout tone="gold">
                Converted at <span className="font-bold text-[#F4E6B8]">₦{rateNum.toLocaleString('en-US')}/$1</span>{' '}
                → {naira(grossNgn)} gross per year.
              </Callout>
            </div>
          )}
        </ResultPanel>
      </div>
    </CalcCard>
  );
}
