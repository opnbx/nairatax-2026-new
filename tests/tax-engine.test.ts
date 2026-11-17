import { describe, it, expect } from 'vitest';
import {
  progressive,
  NEW_BANDS,
  BRACKET_ROWS,
  computeEmployee,
  computeFreelancer,
  computeBusiness,
  computeInvestment,
} from '@/lib/tax-engine';

describe('computeEmployee', () => {
  it('computes PAYE with automatic pension + NHF', () => {
    const r = computeEmployee({ amount: '9000000', period: 'annual', rent: '', ins: '' });
    expect(r.filled).toBe(true);
    expect(r.pension).toBe(720000); // 8%
    expect(r.nhf).toBe(225000); // 2.5%
    // taxable = 9,000,000 - 720,000 - 225,000 = 8,055,000
    expect(r.taxable).toBe(8055000);
    expect(r.tax).toBe(progressive(8055000, NEW_BANDS));
    expect(r.takeHome).toBe(9000000 - 720000 - 225000 - r.tax);
  });
  it('applies capped rent relief and insurance', () => {
    const r = computeEmployee({ amount: '10000000', period: 'annual', rent: '5000000', ins: '9000000' });
    expect(r.rentRelief).toBe(500000); // capped
    expect(r.insurance).toBe(2000000); // capped at 20% of gross
  });
  it('converts monthly to annual', () => {
    const m = computeEmployee({ amount: '750000', period: 'monthly', rent: '', ins: '' });
    expect(m.gross).toBe(9000000);
  });
  it('marks the band the last naira of taxable income falls in', () => {
    const at = (taxable: number) =>
      // Gross that leaves exactly `taxable` after 8% pension + 2.5% NHF.
      computeEmployee({ amount: String(taxable / 0.895), period: 'annual', rent: '', ins: '' });
    expect(at(700000).marginalIdx).toBe(0);
    expect(at(2000000).marginalIdx).toBe(1);
    expect(at(60000000).marginalIdx).toBe(5);
  });
});

describe('computeFreelancer', () => {
  it('caps expenses at income and flags refunds', () => {
    const r = computeFreelancer({ amount: '5000000', period: 'annual', expenses: '9000000', wht: '2000000' });
    expect(r.expenses).toBe(5000000); // capped at income
    expect(r.profit).toBe(0);
    expect(r.tax).toBe(0);
    expect(r.balance).toBe(-2000000);
    expect(r.isRefund).toBe(true);
  });
  it('nets income minus expenses minus tax', () => {
    const r = computeFreelancer({ amount: '5000000', period: 'annual', expenses: '1000000', wht: '' });
    expect(r.profit).toBe(4000000);
    expect(r.net).toBe(5000000 - 1000000 - r.tax);
  });
});

describe('computeBusiness', () => {
  const small = { expenses: '10000000', type: 'general', assets: 'within' } as const;

  it('exempts small companies: turnover ≤ ₦50M, fixed assets ≤ ₦250M, non-professional', () => {
    const r = computeBusiness({ ...small, turnover: '40000000' });
    expect(r.exempt).toBe(true);
    expect(r.total).toBe(0);
    expect(r.net).toBe(r.profit);
    expect(r.bar.net).toBe(100);
    expect(computeBusiness({ ...small, turnover: '50000000' }).exempt).toBe(true);
  });
  it('taxes other companies at 30% CIT + 4% Development Levy', () => {
    const r = computeBusiness({ ...small, turnover: '150000000' });
    expect(r.exempt).toBe(false);
    expect(r.cit).toBe(140000000 * 0.3);
    expect(r.levy).toBe(140000000 * 0.04);
    expect(r.total).toBe(r.cit + r.levy);
    expect(r.effective).toBeCloseTo(0.34);
  });
  it('denies the exemption to professional-services firms', () => {
    const r = computeBusiness({ ...small, turnover: '40000000', type: 'professional' });
    expect(r.exempt).toBe(false);
    expect(r.borderline).toBe(false);
    expect(r.cit).toBe(30000000 * 0.3);
  });
  it('denies the exemption when fixed assets exceed ₦250M', () => {
    const r = computeBusiness({ ...small, turnover: '40000000', assets: 'above' });
    expect(r.exempt).toBe(false);
    expect(r.borderline).toBe(false);
  });
  it('taxes but flags turnover between the ₦50M and ₦100M caps', () => {
    const r = computeBusiness({ ...small, turnover: '50000001' });
    expect(r.exempt).toBe(false);
    expect(r.borderline).toBe(true);
    expect(computeBusiness({ ...small, turnover: '100000000' }).borderline).toBe(true);
    expect(computeBusiness({ ...small, turnover: '100000001' }).borderline).toBe(false);
  });
});

describe('computeInvestment', () => {
  it('withholds 10% on dividends and interest', () => {
    const r = computeInvestment({ div: '1000000', interest: '500000', gains: '0', other: '' });
    expect(r.totalTax).toBe(150000);
    expect(r.whtTax).toBe(150000);
    expect(r.gainsTax).toBe(0);
    expect(r.net).toBe(1350000);
    expect(r.effective).toBeCloseTo(0.1);
    expect(r.breakdown.map((b) => b.label)).toEqual(['Dividends', 'Interest']);
  });
  it('taxes capital gains at the progressive bands', () => {
    // No other income: the first ₦800,000 of gains is tax-free.
    expect(computeInvestment({ div: '', interest: '', gains: '800000', other: '' }).totalTax).toBe(0);
    // 2,000,000 → 1,200,000 × 15% = 180,000
    expect(computeInvestment({ div: '', interest: '', gains: '2000000', other: '' }).totalTax).toBe(180000);
  });
  it('stacks gains on top of other taxable income', () => {
    // Other income of 3,000,000 fills the 0% and 15% bands, so a 1,000,000
    // gain is taxed entirely at 18%.
    const r = computeInvestment({ div: '', interest: '', gains: '1000000', other: '3000000' });
    expect(r.totalTax).toBeCloseTo(180000);
    expect(r.total).toBe(1000000); // other income is not part of the totals
  });
  it('is empty with no investment income', () => {
    expect(computeInvestment({ div: '', interest: '', gains: '', other: '5000000' }).filled).toBe(false);
  });
});

describe('BRACKET_ROWS', () => {
  it('renders the 2026 bands', () => {
    expect(BRACKET_ROWS).toEqual([
      { range: 'First ₦800,000', rate: '0%', on: '₦0' },
      { range: '₦800,001 – ₦3,000,000', rate: '15%', on: 'up to ₦330,000' },
      { range: '₦3,000,001 – ₦12,000,000', rate: '18%', on: 'up to ₦1,620,000' },
      { range: '₦12,000,001 – ₦25,000,000', rate: '21%', on: 'up to ₦2,730,000' },
      { range: '₦25,000,001 – ₦50,000,000', rate: '23%', on: 'up to ₦5,750,000' },
      { range: 'Above ₦50,000,000', rate: '25%', on: '25% of excess' },
    ]);
  });
});
