import { describe, it, expect } from 'vitest';
import { bandBreakdown, computeEmployee, progressive, NEW_BANDS, OLD_BANDS } from '@/lib/tax-engine';
import {
  MONTHLY_SALARIES,
  salaryFigures,
  salaryFromSlug,
  salaryHref,
  salarySlug,
  shortNaira,
} from '@/lib/salary-pages';

describe('bandBreakdown', () => {
  it('splits taxable income across the 2026 bands', () => {
    const slices = bandBreakdown(5370000);
    expect(slices).toHaveLength(NEW_BANDS.length);
    expect(slices[0]).toMatchObject({ from: 0, to: 800000, rate: 0, amount: 800000, tax: 0 });
    expect(slices[1]).toMatchObject({ amount: 2200000, tax: 330000 });
    expect(slices[2].amount).toBe(2370000);
    expect(slices[2].tax).toBeCloseTo(426600, 6);
    expect(slices.slice(3).every((s) => s.amount === 0 && s.tax === 0)).toBe(true);
  });

  it.each([0, 500000, 800000, 800001, 3000000, 12345678, 60000000])(
    'slices sum to progressive() for %i',
    (taxable) => {
      const slices = bandBreakdown(taxable);
      expect(slices.reduce((t, s) => t + s.amount, 0)).toBe(taxable);
      expect(slices.reduce((t, s) => t + s.tax, 0)).toBeCloseTo(progressive(taxable), 6);
    },
  );

  it('accepts an alternative schedule', () => {
    const slices = bandBreakdown(1000000, OLD_BANDS);
    expect(slices.reduce((t, s) => t + s.tax, 0)).toBeCloseTo(progressive(1000000, OLD_BANDS), 6);
  });
});

describe('computeEmployee taxOld', () => {
  it('exposes the old-law tax behind the savings figure', () => {
    const r = computeEmployee({ amount: '500000', period: 'monthly', rent: '', ins: '' });
    // CRA = max(200k, 1% of 6m) + 20% of 6m = 1.4m; taxable = 6m - 1.4m - 480k - 150k
    expect(r.taxOld).toBeCloseTo(progressive(3970000, OLD_BANDS), 6);
    expect(r.savings).toBeCloseTo(Math.max(0, r.taxOld - r.tax), 6);
  });
});

describe('salary pages', () => {
  it('lists unique salaries in ascending order', () => {
    const sorted = [...MONTHLY_SALARIES].sort((a, b) => a - b);
    expect([...MONTHLY_SALARIES]).toEqual(sorted);
    expect(new Set(MONTHLY_SALARIES).size).toBe(MONTHLY_SALARIES.length);
  });

  it('round-trips slugs and rejects unknown ones', () => {
    for (const m of MONTHLY_SALARIES) {
      expect(salaryFromSlug(salarySlug(m))).toBe(m);
      expect(salaryHref(m)).toBe(`/salary/${m}-per-month/`);
    }
    expect(salaryFromSlug('123456-per-month')).toBeUndefined();
    expect(salaryFromSlug('500000')).toBeUndefined();
  });

  it('formats compact labels', () => {
    expect(shortNaira(100000)).toBe('₦100k');
    expect(shortNaira(1000000)).toBe('₦1m');
    expect(shortNaira(1500000)).toBe('₦1.5m');
  });

  it('matches the calculator for a ₦500,000 monthly salary', () => {
    const r = salaryFigures(500000);
    expect(r.gross).toBe(6000000);
    expect(r.taxable).toBe(5370000);
    expect(r.tax).toBeCloseTo(756600, 6);
    expect(r.takeHomeMonthly).toBeCloseTo((6000000 - 480000 - 150000 - 756600) / 12, 6);
  });

  it('applies rent relief when a rent is given', () => {
    const base = salaryFigures(500000);
    const withRent = salaryFigures(500000, 1500000);
    expect(withRent.rentRelief).toBe(300000);
    expect(base.tax - withRent.tax).toBeCloseTo(300000 * 0.18, 6);
  });
});
