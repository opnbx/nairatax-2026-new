import { describe, it, expect } from 'vitest';

/**
 * Test suite for calculator input validation
 */

describe('Input Validation', () => {
  describe('parseFloat handling', () => {
    it('should convert valid number strings to floats', () => {
      expect(parseFloat('1000000') || 0).toBe(1000000);
      expect(parseFloat('500000.50') || 0).toBe(500000.50);
      expect(parseFloat('0') || 0).toBe(0);
    });

    it('should handle empty strings as zero', () => {
      expect(parseFloat('') || 0).toBe(0);
    });

    it('should handle invalid inputs as zero', () => {
      expect(parseFloat('abc') || 0).toBe(0);
      expect(parseFloat('₦1000') || 0).toBe(0); // NaN because of currency symbol
    });

    it('should handle negative numbers', () => {
      expect(parseFloat('-1000') || 0).toBe(-1000);
    });

    it('should handle whitespace', () => {
      expect(parseFloat('  1000  ') || 0).toBe(1000);
    });
  });

  describe('Income validation', () => {
    function isValidIncome(value: string): boolean {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0;
    }

    it('should accept valid positive incomes', () => {
      expect(isValidIncome('1000000')).toBe(true);
      expect(isValidIncome('0')).toBe(true);
      expect(isValidIncome('500000.50')).toBe(true);
    });

    it('should reject negative incomes', () => {
      expect(isValidIncome('-1000')).toBe(false);
    });

    it('should reject non-numeric inputs', () => {
      expect(isValidIncome('abc')).toBe(false);
      expect(isValidIncome('')).toBe(false);
      expect(isValidIncome('₦1000')).toBe(false);
    });
  });

  describe('Expense validation', () => {
    function validateExpenses(
      income: number,
      expenses: number
    ): { valid: boolean; message?: string } {
      if (expenses < 0) {
        return { valid: false, message: 'Expenses cannot be negative' };
      }
      if (expenses > income) {
        return { valid: false, message: 'Expenses cannot exceed income' };
      }
      return { valid: true };
    }

    it('should accept valid expenses less than income', () => {
      const result = validateExpenses(1000000, 500000);
      expect(result.valid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it('should accept zero expenses', () => {
      const result = validateExpenses(1000000, 0);
      expect(result.valid).toBe(true);
    });

    it('should reject negative expenses', () => {
      const result = validateExpenses(1000000, -100);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Expenses cannot be negative');
    });

    it('should reject expenses greater than income', () => {
      const result = validateExpenses(1000000, 1500000);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Expenses cannot exceed income');
    });

    it('should accept expenses equal to income', () => {
      const result = validateExpenses(1000000, 1000000);
      expect(result.valid).toBe(true);
    });
  });

  describe('Exchange rate validation', () => {
    function isValidExchangeRate(rate: string): boolean {
      const num = parseFloat(rate);
      return !isNaN(num) && num > 0 && num < 10000; // Reasonable bounds
    }

    it('should accept valid exchange rates', () => {
      expect(isValidExchangeRate('1500')).toBe(true);
      expect(isValidExchangeRate('800')).toBe(true);
      expect(isValidExchangeRate('2000')).toBe(true);
    });

    it('should reject zero or negative rates', () => {
      expect(isValidExchangeRate('0')).toBe(false);
      expect(isValidExchangeRate('-100')).toBe(false);
    });

    it('should reject unrealistic high rates', () => {
      expect(isValidExchangeRate('10000')).toBe(false);
      expect(isValidExchangeRate('50000')).toBe(false);
    });
  });

  describe('Business revenue validation (Small company exemption)', () => {
    function isSmallCompany(revenue: number, isProfessional: boolean): boolean {
      return revenue <= 50000000 && !isProfessional;
    }

    it('should qualify companies ≤₦50M as small if non-professional', () => {
      expect(isSmallCompany(30000000, false)).toBe(true);
      expect(isSmallCompany(50000000, false)).toBe(true);
      expect(isSmallCompany(10000000, false)).toBe(true);
    });

    it('should disqualify companies >₦50M even if non-professional', () => {
      expect(isSmallCompany(50000001, false)).toBe(false);
      expect(isSmallCompany(100000000, false)).toBe(false);
    });

    it('should disqualify professional services regardless of revenue', () => {
      expect(isSmallCompany(10000000, true)).toBe(false);
      expect(isSmallCompany(50000000, true)).toBe(false);
    });
  });

  describe('Rent relief validation', () => {
    function calculateRentRelief(rentPaid: number): number {
      const relief = Math.round(rentPaid * 0.20);
      return Math.min(relief, 500000); // Max ₦500,000
    }

    it('should calculate 20% of rent paid', () => {
      expect(calculateRentRelief(1000000)).toBe(200000);
      expect(calculateRentRelief(500000)).toBe(100000);
    });

    it('should cap relief at ₦500,000', () => {
      expect(calculateRentRelief(3000000)).toBe(500000);
      expect(calculateRentRelief(5000000)).toBe(500000);
      expect(calculateRentRelief(10000000)).toBe(500000);
    });

    it('should handle zero rent', () => {
      expect(calculateRentRelief(0)).toBe(0);
    });

    it('should handle small rent amounts', () => {
      expect(calculateRentRelief(100000)).toBe(20000);
    });
  });

  describe('WHT (Withholding Tax) validation', () => {
    function calculateWHT(income: number, rate: number): number {
      return Math.round(income * rate);
    }

    it('should calculate 5% WHT for freelancers', () => {
      expect(calculateWHT(1000000, 0.05)).toBe(50000);
      expect(calculateWHT(5000000, 0.05)).toBe(250000);
    });

    it('should calculate 10% WHT for dividends', () => {
      expect(calculateWHT(1000000, 0.10)).toBe(100000);
      expect(calculateWHT(500000, 0.10)).toBe(50000);
    });

    it('should calculate 10% WHT for interest', () => {
      expect(calculateWHT(100000, 0.10)).toBe(10000);
    });

    it('should handle zero income', () => {
      expect(calculateWHT(0, 0.10)).toBe(0);
    });
  });

  describe('Input sanitization', () => {
    function sanitizeNumericInput(input: string): number {
      // Remove common non-numeric characters
      const cleaned = input.replace(/[₦,\s]/g, '');
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : Math.max(0, num);
    }

    it('should remove currency symbols', () => {
      expect(sanitizeNumericInput('₦1000')).toBe(1000);
    });

    it('should remove commas', () => {
      expect(sanitizeNumericInput('1,000,000')).toBe(1000000);
    });

    it('should remove spaces', () => {
      expect(sanitizeNumericInput('1 000 000')).toBe(1000000);
    });

    it('should handle combined formatting', () => {
      expect(sanitizeNumericInput('₦ 1,000,000')).toBe(1000000);
    });

    it('should ensure non-negative results', () => {
      expect(sanitizeNumericInput('-1000')).toBe(0);
    });
  });
});
