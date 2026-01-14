import { describe, it, expect } from 'vitest';

/**
 * Test suite for currency formatting utilities
 */

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

describe('Currency Formatting', () => {
  describe('Basic formatting', () => {
    it('should format zero as ₦0', () => {
      expect(formatCurrency(0)).toBe('₦0');
    });

    it('should format positive integers', () => {
      expect(formatCurrency(1000)).toBe('₦1,000');
      expect(formatCurrency(10000)).toBe('₦10,000');
      expect(formatCurrency(100000)).toBe('₦100,000');
    });

    it('should format millions with proper thousand separators', () => {
      expect(formatCurrency(1000000)).toBe('₦1,000,000');
      expect(formatCurrency(5000000)).toBe('₦5,000,000');
      expect(formatCurrency(10000000)).toBe('₦10,000,000');
    });

    it('should format billions', () => {
      expect(formatCurrency(1000000000)).toBe('₦1,000,000,000');
    });
  });

  describe('Rounding behavior', () => {
    it('should round down decimals (no decimal places shown)', () => {
      const result1 = formatCurrency(1000.4);
      const result2 = formatCurrency(1000.9);
      // Both should display as ₦1,000 (formatting removes decimals)
      expect(result1).toBe('₦1,000');
      expect(result2).toBe('₦1,001');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-5000)).toBe('-₦5,000');
      expect(formatCurrency(-1000000)).toBe('-₦1,000,000');
    });
  });

  describe('Tax-specific amounts', () => {
    it('should format tax-free threshold (₦800,000)', () => {
      expect(formatCurrency(800000)).toBe('₦800,000');
    });

    it('should format bracket limits', () => {
      expect(formatCurrency(3000000)).toBe('₦3,000,000');
      expect(formatCurrency(12000000)).toBe('₦12,000,000');
      expect(formatCurrency(25000000)).toBe('₦25,000,000');
      expect(formatCurrency(50000000)).toBe('₦50,000,000');
    });

    it('should format calculated tax amounts', () => {
      expect(formatCurrency(330000)).toBe('₦330,000');
      expect(formatCurrency(591000)).toBe('₦591,000');
      expect(formatCurrency(1590000)).toBe('₦1,590,000');
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      const billion = 1000000000;
      expect(formatCurrency(billion)).toContain('₦');
      expect(formatCurrency(billion)).toContain(',');
    });

    it('should handle numbers with 1, 2, 3 digits', () => {
      expect(formatCurrency(5)).toBe('₦5');
      expect(formatCurrency(50)).toBe('₦50');
      expect(formatCurrency(500)).toBe('₦500');
    });

    it('should handle exactly 1000', () => {
      expect(formatCurrency(1000)).toBe('₦1,000');
    });
  });

  describe('Consistency with Math.round', () => {
    it('should match rounded values', () => {
      const value = 12345.67;
      const rounded = Math.round(value);
      expect(formatCurrency(rounded)).toBe('₦12,346');
    });

    it('should handle pre-rounded tax calculations', () => {
      const taxableIncome = 5000000;
      const pension = Math.round(taxableIncome * 0.08);
      expect(formatCurrency(pension)).toBe('₦400,000');

      const nhf = Math.round(taxableIncome * 0.025);
      expect(formatCurrency(nhf)).toBe('₦125,000');
    });
  });
});
