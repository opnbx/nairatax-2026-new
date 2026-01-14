import { describe, it, expect } from 'vitest';

/**
 * Test suite for Nigerian Tax Act 2025 progressive tax calculations
 * Tax Brackets:
 * - ₦0 - ₦800,000: 0%
 * - ₦800,001 - ₦3,000,000: 15%
 * - ₦3,000,001 - ₦12,000,000: 18%
 * - ₦12,000,001 - ₦25,000,000: 21%
 * - ₦25,000,001 - ₦50,000,000: 23%
 * - Above ₦50,000,000: 25%
 */

const TAX_BRACKETS = [
  { limit: 800000, rate: 0.00, base: 0 },
  { limit: 3000000, rate: 0.15, base: 800000 },
  { limit: 12000000, rate: 0.18, base: 3000000 },
  { limit: 25000000, rate: 0.21, base: 12000000 },
  { limit: 50000000, rate: 0.23, base: 25000000 },
  { limit: Infinity, rate: 0.25, base: 50000000 },
];

function calculateProgressiveTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  let totalTax = 0;
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    if (taxableIncome > bracket.base) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.base,
        bracket.limit - bracket.base
      );
      totalTax += taxableInBracket * bracket.rate;
    }
  }
  return Math.round(totalTax);
}

describe('Progressive Tax Calculation', () => {
  describe('Tax-free threshold (₦0 - ₦800,000)', () => {
    it('should return ₦0 tax for income at ₦800,000 threshold', () => {
      expect(calculateProgressiveTax(800000)).toBe(0);
    });

    it('should return ₦0 tax for income below threshold', () => {
      expect(calculateProgressiveTax(500000)).toBe(0);
      expect(calculateProgressiveTax(100000)).toBe(0);
    });

    it('should return ₦0 tax for zero income', () => {
      expect(calculateProgressiveTax(0)).toBe(0);
    });

    it('should return ₦0 tax for negative income', () => {
      expect(calculateProgressiveTax(-100000)).toBe(0);
    });
  });

  describe('First bracket (₦800,001 - ₦3,000,000 at 15%)', () => {
    it('should calculate tax for ₦1,000,000 income', () => {
      // (1,000,000 - 800,000) * 0.15 = 30,000
      expect(calculateProgressiveTax(1000000)).toBe(30000);
    });

    it('should calculate tax for ₦2,000,000 income', () => {
      // (2,000,000 - 800,000) * 0.15 = 180,000
      expect(calculateProgressiveTax(2000000)).toBe(180000);
    });

    it('should calculate tax for ₦3,000,000 income (bracket limit)', () => {
      // (3,000,000 - 800,000) * 0.15 = 330,000
      expect(calculateProgressiveTax(3000000)).toBe(330000);
    });
  });

  describe('Second bracket (₦3,000,001 - ₦12,000,000 at 18%)', () => {
    it('should calculate tax for ₦5,000,000 income', () => {
      // First bracket: (3,000,000 - 800,000) * 0.15 = 330,000
      // Second bracket: (5,000,000 - 3,000,000) * 0.18 = 360,000
      // Total: 690,000
      expect(calculateProgressiveTax(5000000)).toBe(690000);
    });

    it('should calculate tax for ₦10,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: (10,000,000 - 3,000,000) * 0.18 = 1,260,000
      // Total: 1,590,000
      expect(calculateProgressiveTax(10000000)).toBe(1590000);
    });
  });

  describe('Third bracket (₦12,000,001 - ₦25,000,000 at 21%)', () => {
    it('should calculate tax for ₦15,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: (12,000,000 - 3,000,000) * 0.18 = 1,620,000
      // Third bracket: (15,000,000 - 12,000,000) * 0.21 = 630,000
      // Total: 2,580,000
      expect(calculateProgressiveTax(15000000)).toBe(2580000);
    });

    it('should calculate tax for ₦20,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: 1,620,000
      // Third bracket: (20,000,000 - 12,000,000) * 0.21 = 1,680,000
      // Total: 3,630,000
      expect(calculateProgressiveTax(20000000)).toBe(3630000);
    });
  });

  describe('Fourth bracket (₦25,000,001 - ₦50,000,000 at 23%)', () => {
    it('should calculate tax for ₦30,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: 1,620,000
      // Third bracket: (25,000,000 - 12,000,000) * 0.21 = 2,730,000
      // Fourth bracket: (30,000,000 - 25,000,000) * 0.23 = 1,150,000
      // Total: 5,830,000
      expect(calculateProgressiveTax(30000000)).toBe(5830000);
    });
  });

  describe('Fifth bracket (Above ₦50,000,000 at 25%)', () => {
    it('should calculate tax for ₦60,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: 1,620,000
      // Third bracket: 2,730,000
      // Fourth bracket: (50,000,000 - 25,000,000) * 0.23 = 5,750,000
      // Fifth bracket: (60,000,000 - 50,000,000) * 0.25 = 2,500,000
      // Total: 12,930,000
      expect(calculateProgressiveTax(60000000)).toBe(12930000);
    });

    it('should calculate tax for ₦100,000,000 income', () => {
      // First bracket: 330,000
      // Second bracket: 1,620,000
      // Third bracket: 2,730,000
      // Fourth bracket: 5,750,000
      // Fifth bracket: (100,000,000 - 50,000,000) * 0.25 = 12,500,000
      // Total: 22,930,000
      expect(calculateProgressiveTax(100000000)).toBe(22930000);
    });
  });

  describe('Standard deductions', () => {
    it('should calculate pension deduction (8%)', () => {
      const income = 5000000;
      const pension = Math.round(income * 0.08);
      expect(pension).toBe(400000);
    });

    it('should calculate NHF deduction (2.5%)', () => {
      const income = 5000000;
      const nhf = Math.round(income * 0.025);
      expect(nhf).toBe(125000);
    });

    it('should calculate NHIS deduction (5%, max ₦25,000)', () => {
      const income1 = 500000;
      const nhis1 = Math.min(Math.round(income1 * 0.05), 25000);
      expect(nhis1).toBe(25000);

      const income2 = 10000000;
      const nhis2 = Math.min(Math.round(income2 * 0.05), 25000);
      expect(nhis2).toBe(25000);
    });

    it('should calculate total deductions correctly', () => {
      const income = 5000000;
      const pension = Math.round(income * 0.08); // 400,000
      const nhf = Math.round(income * 0.025); // 125,000
      const nhis = Math.min(Math.round(income * 0.05), 25000); // 25,000
      const total = pension + nhf + nhis;
      expect(total).toBe(550000);
    });
  });

  describe('Complete tax calculation with deductions', () => {
    it('should calculate net tax for ₦5,000,000 gross income', () => {
      const grossIncome = 5000000;

      // Deductions
      const pension = Math.round(grossIncome * 0.08); // 400,000
      const nhf = Math.round(grossIncome * 0.025); // 125,000
      const nhis = Math.min(Math.round(grossIncome * 0.05), 25000); // 25,000
      const totalDeductions = pension + nhf + nhis; // 550,000

      // Taxable income
      const taxableIncome = grossIncome - totalDeductions; // 4,450,000

      // Tax calculation
      const tax = calculateProgressiveTax(taxableIncome);
      // First bracket: 330,000
      // Second bracket: (4,450,000 - 3,000,000) * 0.18 = 261,000
      // Total: 591,000

      expect(tax).toBe(591000);
    });
  });

  describe('Edge cases', () => {
    it('should handle income exactly at bracket boundaries', () => {
      expect(calculateProgressiveTax(800000)).toBe(0);
      expect(calculateProgressiveTax(3000000)).toBe(330000);
      expect(calculateProgressiveTax(12000000)).toBe(1950000);
      expect(calculateProgressiveTax(25000000)).toBe(4680000);
      expect(calculateProgressiveTax(50000000)).toBe(10430000);
    });

    it('should handle income ₦1 above bracket boundaries', () => {
      expect(calculateProgressiveTax(800001)).toBe(0); // Rounds to 0
      expect(calculateProgressiveTax(3000001)).toBe(330000); // Rounds to 330000
    });

    it('should handle very large incomes', () => {
      const largeIncome = 1000000000; // ₦1 billion
      const tax = calculateProgressiveTax(largeIncome);
      expect(tax).toBeGreaterThan(0);
      expect(tax).toBeLessThan(largeIncome);
    });
  });
});
