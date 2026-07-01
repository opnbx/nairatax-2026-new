import { describe, it, expect } from 'vitest';
import {
  parseNaira,
  naira,
  progressive,
  NEW_BANDS,
  computeEmployee,
  computeFreelancer,
  computeBusiness,
  computeInvestment,
} from '@/lib/tax-engine';

describe('parseNaira', () => {
  it('strips non-numeric characters', () => {
    expect(parseNaira('₦1,234,567')).toBe(1234567);
    expect(parseNaira('5000000')).toBe(5000000);
    expect(parseNaira('1,000.50')).toBe(1000.5);
  });
  it('returns 0 for empty / invalid', () => {
    expect(parseNaira('')).toBe(0);
    expect(parseNaira('abc')).toBe(0);
    expect(parseNaira(null)).toBe(0);
    expect(parseNaira(undefined)).toBe(0);
  });
});

describe('naira', () => {
  it('formats magnitude with comma grouping, no decimals', () => {
    expect(naira(0)).toBe('₦0');
    expect(naira(1234567)).toBe('₦1,234,567');
    expect(naira(-500)).toBe('₦500'); // magnitude
  });
});

describe('progressive (2026 bands)', () => {
  it('is zero at/below the tax-free threshold', () => {
    expect(progressive(0, NEW_BANDS)).toBe(0);
    expect(progressive(800000, NEW_BANDS)).toBe(0);
  });
  it('taxes only the portion in each band', () => {
    // 1,000,000 → 200,000 in the 15% band = 30,000
    expect(progressive(1000000, NEW_BANDS)).toBe(30000);
    // 3,000,000 → 2,200,000 × 15% = 330,000
    expect(progressive(3000000, NEW_BANDS)).toBe(330000);
    // 12,000,000 → 330,000 + 9,000,000 × 18% = 1,950,000
    expect(progressive(12000000, NEW_BANDS)).toBe(1950000);
  });
});

describe('computeEmployee', () => {
  it('is empty until a positive salary is entered', () => {
    expect(computeEmployee({ amount: '', period: 'annual', rent: '', ins: '' }).filled).toBe(false);
    expect(computeEmployee({ amount: '0', period: 'annual', rent: '', ins: '' }).filled).toBe(false);
  });
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
  it('exempts small non-professional companies', () => {
    const r = computeBusiness({ turnover: '40000000', expenses: '10000000', type: 'general' });
    expect(r.exempt).toBe(true);
    expect(r.total).toBe(0);
    expect(r.net).toBe(r.profit);
    expect(r.bar.net).toBe(100);
  });
  it('taxes professional small companies at 30% + 2%', () => {
    const r = computeBusiness({ turnover: '40000000', expenses: '10000000', type: 'professional' });
    expect(r.exempt).toBe(false);
    expect(r.cit).toBe(30000000 * 0.3);
    expect(r.edu).toBe(30000000 * 0.02);
    expect(r.total).toBe(r.cit + r.edu);
  });
  it('taxes large companies regardless of type', () => {
    const r = computeBusiness({ turnover: '80000000', expenses: '20000000', type: 'general' });
    expect(r.small).toBe(false);
    expect(r.exempt).toBe(false);
    expect(r.cit).toBe(60000000 * 0.3);
  });
});

describe('computeInvestment', () => {
  it('applies a flat 10% and lists non-zero sources', () => {
    const r = computeInvestment({ div: '1000000', interest: '500000', gains: '0' });
    expect(r.totalTax).toBe(150000);
    expect(r.net).toBe(1350000);
    expect(r.effective).toBeCloseTo(0.1);
    expect(r.breakdown).toHaveLength(2);
    expect(r.breakdown.map((b) => b.label)).toEqual(['Dividends', 'Interest']);
  });
  it('is empty with no income', () => {
    expect(computeInvestment({ div: '', interest: '', gains: '' }).filled).toBe(false);
  });
});
