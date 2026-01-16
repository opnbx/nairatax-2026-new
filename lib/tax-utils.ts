export interface TaxBracket {
  limit: number;
  rate: number;
  base: number;
}

// Nigeria Tax Act 2025 - Progressive Tax Brackets (Effective Jan 1, 2026)
// Source: https://taxclearancecertificate.com/new-paye-computation-under-the-nigeria-tax-act-nta-2025-everything-you-need-to-know/
export const TAX_BRACKETS: TaxBracket[] = [
  { limit: 800000, rate: 0.00, base: 0 },           // 0% on first ₦800K
  { limit: 3000000, rate: 0.15, base: 800000 },     // 15% on ₦800K - ₦3M
  { limit: 12000000, rate: 0.18, base: 3000000 },   // 18% on ₦3M - ₦12M
  { limit: 25000000, rate: 0.21, base: 12000000 },  // 21% on ₦12M - ₦25M
  { limit: 50000000, rate: 0.23, base: 25000000 },  // 23% on ₦25M - ₦50M
  { limit: Infinity, rate: 0.25, base: 50000000 },  // 25% above ₦50M
];

/**
 * Calculate progressive tax using marginal rates
 * CRITICAL: This uses marginal/progressive taxation, NOT flat rate
 */
export const calculateProgressiveTax = (taxableIncome: number): number => {
  if (taxableIncome <= 0) return 0;

  let totalTax = 0;

  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];

    // If income exceeds this bracket's base, calculate tax for this bracket
    if (taxableIncome > bracket.base) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.base,
        bracket.limit - bracket.base
      );
      const taxForBracket = taxableInBracket * bracket.rate;
      totalTax += taxForBracket;
    }
  }

  return Math.round(totalTax);
};

/**
 * Format currency in Nigerian Naira
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Sanitize number input from string
 */
export const sanitizeNumberInput = (value: string): number => {
  if (!value || value.trim() === '') return 0;
  const num = parseFloat(value.replace(/[^
\d.-]/g, ''));
  return isNaN(num) || num < 0 ? 0 : Math.min(num, 1e12); // Max 1 trillion
};
