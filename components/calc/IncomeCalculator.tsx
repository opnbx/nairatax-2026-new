'use client';

import { useState } from 'react';
import { computeFreelancer, naira, pct, type Period } from '@/lib/tax-engine';
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

export interface IncomeLabels {
  cardTitle: string;
  cardSub: string;
  incomeLabel: string;
  expensesLabel: string;
  expensesHelper: string;
  whtLabel: string;
  whtHelper: string;
  /** Bar-segment + net-sub word for expenses, e.g. "expenses" or "costs". */
  costsWord: string;
  /** Middle clause of the WHT callout, e.g. "withheld by clients". */
  whtMiddle: string;
  empty: string;
}

/** Shared engine for the Freelancer and Content-creator calculators. */
export function IncomeCalculator({ labels }: { labels: IncomeLabels }) {
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<Period>('annual');
  const [expenses, setExpenses] = useState('');
  const [wht, setWht] = useState('');

  const res = computeFreelancer({ amount, period, expenses, wht });

  return (
    <CalcCard title={labels.cardTitle} sub={labels.cardSub}>
      <div className="grid lg:grid-cols-[0.82fr_1fr]">
        <div className="space-y-4 border-hairline-2 p-6 lg:border-r">
          <div>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel>{labels.incomeLabel}</FieldLabel>
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
              <MoneyInput id="income" value={amount} onChange={setAmount} ariaLabel={labels.incomeLabel} />
            </div>
          </div>

          <div>
            <FieldLabel>{labels.expensesLabel}</FieldLabel>
            <div className="mt-2">
              <MoneyInput id="expenses" value={expenses} onChange={setExpenses} ariaLabel={labels.expensesLabel} helper={labels.expensesHelper} />
            </div>
          </div>

          <div>
            <FieldLabel>{labels.whtLabel}</FieldLabel>
            <div className="mt-2">
              <MoneyInput id="wht" value={wht} onChange={setWht} ariaLabel={labels.whtLabel} helper={labels.whtHelper} />
            </div>
          </div>
        </div>

        <ResultPanel>
          {!res.filled ? (
            <EmptyResult>{labels.empty}</EmptyResult>
          ) : (
            <div className="space-y-5">
              <ResultHero
                eyebrow="Net annual income"
                value={naira(res.net)}
                sub={`after ${naira(res.expenses)} ${labels.costsWord} & ${naira(res.tax)} tax`}
              />
              <StatGrid
                cells={[
                  { label: 'Tax due', value: naira(res.tax) },
                  { label: res.isRefund ? 'Refund due' : 'Balance due', value: naira(res.balance) },
                  { label: 'Eff. rate', value: pct(res.effective), gold: true },
                ]}
              />
              <SplitBar
                segments={[
                  { label: 'Net income', pct: res.bar.net, color: BAR.net },
                  { label: 'Tax', pct: res.bar.tax, color: BAR.tax },
                  { label: labels.costsWord === 'costs' ? 'Costs' : 'Expenses', pct: res.bar.expenses, color: BAR.ded },
                ]}
              />
              {res.wht > 1000 && (
                <Callout tone="green">
                  <span className="mr-1 font-bold">✓</span>
                  {`${naira(res.wht)} ${labels.whtMiddle} is credited against your tax.`}
                </Callout>
              )}
            </div>
          )}
        </ResultPanel>
      </div>
    </CalcCard>
  );
}
