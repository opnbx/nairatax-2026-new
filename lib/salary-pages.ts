/**
 * Monthly salaries that get a pre-computed "tax on ₦X salary" page under
 * /salary/. Every figure on those pages comes from the same engine the
 * calculators use, so the pages can never drift from the calculator.
 */
import { computeEmployee, type EmployeeResult } from './tax-engine';

/** Gross monthly salaries, in naira, ascending. */
export const MONTHLY_SALARIES = [
  100000, 150000, 200000, 250000, 300000, 400000, 500000, 600000, 700000,
  800000, 1000000, 1500000, 2000000, 3000000, 5000000,
] as const;

/** Compact label: 500000 → "₦500k", 1500000 → "₦1.5m". */
export function shortNaira(n: number): string {
  if (n >= 1000000) return `₦${+(n / 1000000).toFixed(2)}m`;
  if (n >= 1000) return `₦${+(n / 1000).toFixed(1)}k`;
  return `₦${n}`;
}

export function salarySlug(monthly: number): string {
  return `${monthly}-per-month`;
}

export function salaryHref(monthly: number): string {
  return `/salary/${salarySlug(monthly)}/`;
}

/** Inverse of `salarySlug`; undefined for anything not in MONTHLY_SALARIES. */
export function salaryFromSlug(slug: string): number | undefined {
  return MONTHLY_SALARIES.find((m) => salarySlug(m) === slug);
}

/** PAYE figures for a gross monthly salary with no rent or insurance relief. */
export function salaryFigures(monthly: number, annualRent = 0): EmployeeResult {
  return computeEmployee({
    amount: String(monthly),
    period: 'monthly',
    rent: annualRent > 0 ? String(annualRent) : '',
    ins: '',
  });
}
