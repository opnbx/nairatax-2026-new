import { describe, it, expect } from 'vitest';
import {
  parseNaira,
  computeEmployee,
  computeFreelancer,
  computeBusiness,
} from '@/lib/tax-engine';

/**
 * Input validation, exercising the shipping engine (lib/tax-engine.ts):
 * parseNaira (the calculator input parser) and the input-handling behaviour of
 * the compute functions.
 */
describe('parseNaira', () => {
  it('parses plain number strings', () => {
    expect(parseNaira('1000000')).toBe(1000000);
    expect(parseNaira('500000.50')).toBe(500000.5);
    expect(parseNaira('0')).toBe(0);
  });

  it('treats empty / nullish as 0', () => {
    expect(parseNaira('')).toBe(0);
    expect(parseNaira(null)).toBe(0);
    expect(parseNaira(undefined)).toBe(0);
  });

  it('treats non-numeric junk as 0', () => {
    expect(parseNaira('abc')).toBe(0);
    expect(parseNaira('  ')).toBe(0);
  });

  it('strips currency symbols, commas and whitespace', () => {
    expect(parseNaira('₦1,000,000')).toBe(1000000);
    expect(parseNaira('  1000  ')).toBe(1000);
    expect(parseNaira('1,234.56')).toBe(1234.56);
  });

  it('strips a leading minus (negatives are not accepted)', () => {
    // The '-' is not in the allow-list, so it is removed rather than producing
    // a negative amount.
    expect(parseNaira('-1000')).toBe(1000);
  });
});

describe('Income validation (computeEmployee)', () => {
  it('is unfilled until a positive salary is entered', () => {
    expect(computeEmployee({ amount: '', period: 'annual', rent: '', ins: '' }).filled).toBe(false);
    expect(computeEmployee({ amount: '0', period: 'annual', rent: '', ins: '' }).filled).toBe(false);
    expect(computeEmployee({ amount: 'abc', period: 'annual', rent: '', ins: '' }).filled).toBe(false);
  });

  it('accepts a comma-formatted salary', () => {
    const r = computeEmployee({ amount: '9,000,000', period: 'annual', rent: '', ins: '' });
    expect(r.filled).toBe(true);
    expect(r.gross).toBe(9000000);
  });
});

describe('Rent relief validation (computeEmployee)', () => {
  it('is 20% of rent, capped at ₦500,000', () => {
    const base = { amount: '10000000', period: 'annual' as const, ins: '' };
    expect(computeEmployee({ ...base, rent: '1000000' }).rentRelief).toBe(200000);
    expect(computeEmployee({ ...base, rent: '5000000' }).rentRelief).toBe(500000);
    expect(computeEmployee({ ...base, rent: '' }).rentRelief).toBe(0);
  });
});

describe('Expense validation (computeFreelancer)', () => {
  it('caps expenses at income so profit never goes negative', () => {
    const r = computeFreelancer({ amount: '5000000', period: 'annual', expenses: '9000000', wht: '' });
    expect(r.expenses).toBe(5000000);
    expect(r.profit).toBe(0);
  });
});

describe('Business revenue validation (computeBusiness)', () => {
  it('exempts small non-professional companies (≤ ₦50M)', () => {
    expect(computeBusiness({ turnover: '50000000', expenses: '', type: 'general' }).exempt).toBe(true);
    expect(computeBusiness({ turnover: '50000001', expenses: '', type: 'general' }).exempt).toBe(false);
    expect(computeBusiness({ turnover: '40000000', expenses: '', type: 'professional' }).exempt).toBe(false);
  });
});
