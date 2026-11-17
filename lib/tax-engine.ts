/**
 * NairaTax calculator engine — Nigeria Tax Act 2025 (effective 1 Jan 2026).
 *
 * All figures are client-side estimates; see the "estimates only" disclaimer
 * surfaced in the UI.
 */

// --- Parsing & formatting -------------------------------------------------

/** Strip everything except digits and a decimal point, then parse. Empty → 0. */
export function parseNaira(value: string | number | null | undefined): number {
  const n = parseFloat(String(value ?? '').replace(/[^0-9.]/g, ''));
  return isFinite(n) ? n : 0;
}

/** '₦' + comma-grouped magnitude, no decimals. */
export function naira(n: number): string {
  return '₦' + Math.round(Math.abs(n || 0)).toLocaleString('en-US');
}

/** Percentage with one decimal, e.g. 0.153 → "15.3%". */
export function pct(fraction: number): string {
  return (fraction * 100).toFixed(1) + '%';
}

// --- Progressive bands ----------------------------------------------------

type Band = [cap: number, rate: number];

/** 2026 progressive personal-income bands (cumulative, on taxable income). */
export const NEW_BANDS: Band[] = [
  [800000, 0],
  [3000000, 0.15],
  [12000000, 0.18],
  [25000000, 0.21],
  [50000000, 0.23],
  [Infinity, 0.25],
];

/** Pre-2026 bands, used only for the old-law savings comparison. */
export const OLD_BANDS: Band[] = [
  [300000, 0.07],
  [600000, 0.11],
  [1100000, 0.15],
  [1600000, 0.19],
  [3200000, 0.21],
  [Infinity, 0.24],
];

/** Sum of (portion of taxable income in each band) × rate. */
export function progressive(taxable: number, bands: Band[] = NEW_BANDS): number {
  let prev = 0;
  let total = 0;
  for (const [cap, rate] of bands) {
    if (taxable > prev) {
      total += (Math.min(taxable, cap) - prev) * rate;
      prev = cap;
    } else {
      break;
    }
  }
  return total;
}

/** Index of the band the last naira of taxable income falls in. */
function marginalIndex(taxable: number): number {
  return NEW_BANDS.findIndex(([cap]) => taxable <= cap);
}

/** Clamp a value's share of a base to a 0–100 percentage. */
function share(value: number, base: number): number {
  if (!(base > 0)) return 0;
  return Math.max(0, Math.min(100, (value / base) * 100));
}

export type Period = 'monthly' | 'annual';

// --- Employee (Home PAYE) -------------------------------------------------

export interface EmployeeInput {
  amount: string;
  period: Period;
  rent: string;
  ins: string;
}

export interface EmployeeResult {
  filled: boolean;
  gross: number;
  grossMonthly: number;
  pension: number;
  nhf: number;
  rentRelief: number;
  insurance: number;
  deductions: number;
  taxable: number;
  tax: number;
  takeHome: number;
  takeHomeMonthly: number;
  effective: number;
  savings: number;
  hasSavings: boolean;
  marginalIdx: number;
  bar: { takeHome: number; tax: number; deductions: number };
}

const EMPTY_EMPLOYEE: EmployeeResult = {
  filled: false, gross: 0, grossMonthly: 0, pension: 0, nhf: 0, rentRelief: 0,
  insurance: 0, deductions: 0, taxable: 0, tax: 0, takeHome: 0, takeHomeMonthly: 0,
  effective: 0, savings: 0, hasSavings: false, marginalIdx: 0,
  bar: { takeHome: 0, tax: 0, deductions: 0 },
};

export function computeEmployee(input: EmployeeInput): EmployeeResult {
  const gross = input.period === 'monthly' ? parseNaira(input.amount) * 12 : parseNaira(input.amount);
  if (!(gross > 0)) return EMPTY_EMPLOYEE;

  const rent = parseNaira(input.rent);
  const insRaw = parseNaira(input.ins);
  const pension = gross * 0.08;
  const nhf = gross * 0.025;
  const rentRelief = Math.min(rent * 0.2, 500000);
  const insurance = Math.min(insRaw, gross * 0.2);
  const deductions = pension + nhf;
  const taxable = Math.max(0, gross - pension - nhf - rentRelief - insurance);
  const tax = progressive(taxable, NEW_BANDS);
  const takeHome = gross - pension - nhf - tax;
  const effective = tax / gross;

  // Old-law comparison for the savings callout.
  const cra = Math.max(200000, gross * 0.01) + gross * 0.2;
  const taxableOld = Math.max(0, gross - cra - pension - nhf - insurance);
  const taxOld = progressive(taxableOld, OLD_BANDS);
  const savings = Math.max(0, taxOld - tax);

  return {
    filled: true,
    gross,
    grossMonthly: gross / 12,
    pension,
    nhf,
    rentRelief,
    insurance,
    deductions,
    taxable,
    tax,
    takeHome,
    takeHomeMonthly: takeHome / 12,
    effective,
    savings,
    hasSavings: savings > 1000,
    marginalIdx: marginalIndex(taxable),
    bar: {
      takeHome: share(takeHome, gross),
      tax: share(tax, gross),
      deductions: share(deductions, gross),
    },
  };
}

// --- Freelancer / Creator (identical math) --------------------------------

export interface FreelancerInput {
  amount: string;
  period: Period;
  expenses: string;
  wht: string;
}

export interface FreelancerResult {
  filled: boolean;
  income: number;
  expenses: number;
  profit: number;
  tax: number;
  wht: number;
  balance: number;
  isRefund: boolean;
  net: number;
  effective: number;
  bar: { net: number; tax: number; expenses: number };
}

const EMPTY_FREELANCER: FreelancerResult = {
  filled: false, income: 0, expenses: 0, profit: 0, tax: 0, wht: 0, balance: 0,
  isRefund: false, net: 0, effective: 0, bar: { net: 0, tax: 0, expenses: 0 },
};

export function computeFreelancer(input: FreelancerInput): FreelancerResult {
  const income = input.period === 'monthly' ? parseNaira(input.amount) * 12 : parseNaira(input.amount);
  if (!(income > 0)) return EMPTY_FREELANCER;

  const expenses = Math.min(parseNaira(input.expenses), income);
  const profit = Math.max(0, income - expenses);
  const tax = progressive(profit, NEW_BANDS);
  const wht = parseNaira(input.wht);
  const balance = tax - wht;
  const net = income - expenses - tax;

  return {
    filled: true,
    income,
    expenses,
    profit,
    tax,
    wht,
    balance,
    isRefund: balance < 0,
    net,
    effective: tax / income,
    bar: {
      net: share(net, income),
      tax: share(tax, income),
      expenses: share(expenses, income),
    },
  };
}

// --- Business (CIT) -------------------------------------------------------

export const CIT_RATE = 0.3;
/** Development Levy on assessable profit; replaced the Tertiary Education Tax. */
export const DEV_LEVY_RATE = 0.04;
/** Small-company turnover cap as enacted in the Nigeria Tax Act 2025 (s.202). */
export const SMALL_COMPANY_TURNOVER = 50000000;
/**
 * The Tax Administration Act and official implementation guidance use ₦100M
 * instead. Companies between the two caps are taxed here (the cautious reading)
 * and flagged as `borderline` so the UI can say they may qualify for 0%.
 */
export const SMALL_COMPANY_TURNOVER_GUIDANCE = 100000000;

export type CompanyType = 'general' | 'professional';
/** Whether total fixed assets are within the ₦250M small-company limit. */
export type FixedAssets = 'within' | 'above';

export interface BusinessInput {
  turnover: string;
  expenses: string;
  type: CompanyType;
  assets: FixedAssets;
}

export interface BusinessResult {
  filled: boolean;
  turnover: number;
  expenses: number;
  profit: number;
  exempt: boolean;
  borderline: boolean;
  cit: number;
  levy: number;
  total: number;
  net: number;
  effective: number;
  bar: { net: number; cit: number; levy: number };
}

const EMPTY_BUSINESS: BusinessResult = {
  filled: false, turnover: 0, expenses: 0, profit: 0, exempt: false, borderline: false,
  cit: 0, levy: 0, total: 0, net: 0, effective: 0, bar: { net: 0, cit: 0, levy: 0 },
};

export function computeBusiness(input: BusinessInput): BusinessResult {
  const turnover = parseNaira(input.turnover);
  if (!(turnover > 0)) return EMPTY_BUSINESS;

  const expenses = Math.min(parseNaira(input.expenses), turnover);
  const profit = Math.max(0, turnover - expenses);
  // Small-company status needs all three: turnover, fixed assets, and not a
  // professional-services firm.
  const eligible = input.type !== 'professional' && input.assets === 'within';
  const exempt = eligible && turnover <= SMALL_COMPANY_TURNOVER;
  const borderline = eligible && !exempt && turnover <= SMALL_COMPANY_TURNOVER_GUIDANCE;
  const cit = exempt ? 0 : profit * CIT_RATE;
  const levy = exempt ? 0 : profit * DEV_LEVY_RATE;
  const total = cit + levy;
  const net = profit - total;

  return {
    filled: true,
    turnover,
    expenses,
    profit,
    exempt,
    borderline,
    cit,
    levy,
    total,
    net,
    effective: profit > 0 ? total / profit : 0,
    bar: {
      net: exempt ? 100 : share(net, profit),
      cit: share(cit, profit),
      levy: share(levy, profit),
    },
  };
}

// --- Investment -----------------------------------------------------------

export const INVESTMENT_WHT_RATE = 0.1;

export interface InvestmentInput {
  div: string;
  interest: string;
  gains: string;
  /** Other taxable income for the year; sets the band the gains fall in. */
  other: string;
}

export interface InvestmentBreakdownRow {
  label: string;
  note: string;
  tax: number;
}

export interface InvestmentResult {
  filled: boolean;
  total: number;
  /** Tax withheld at source on dividends and interest. */
  whtTax: number;
  /** Income tax on capital gains, due on self-assessment. */
  gainsTax: number;
  totalTax: number;
  net: number;
  effective: number;
  breakdown: InvestmentBreakdownRow[];
}

const EMPTY_INVESTMENT: InvestmentResult = {
  filled: false, total: 0, whtTax: 0, gainsTax: 0, totalTax: 0, net: 0, effective: 0, breakdown: [],
};

export function computeInvestment(input: InvestmentInput): InvestmentResult {
  const d = parseNaira(input.div);
  const i = parseNaira(input.interest);
  const g = parseNaira(input.gains);
  const total = d + i + g;
  if (!(total > 0)) return EMPTY_INVESTMENT;

  const divTax = d * INVESTMENT_WHT_RATE;
  const intTax = i * INVESTMENT_WHT_RATE;
  // An individual's chargeable gains are taxed as income: stacked on top of
  // their other taxable income and charged at the progressive bands.
  const other = parseNaira(input.other);
  const gainsTax = progressive(other + g, NEW_BANDS) - progressive(other, NEW_BANDS);
  const totalTax = divTax + intTax + gainsTax;

  const breakdown: InvestmentBreakdownRow[] = [];
  if (d > 0) breakdown.push({ label: 'Dividends', note: '10% WHT', tax: divTax });
  if (i > 0) breakdown.push({ label: 'Interest', note: '10% WHT', tax: intTax });
  if (g > 0) breakdown.push({ label: 'Capital gains', note: 'income-tax bands', tax: gainsTax });

  return {
    filled: true,
    total,
    whtTax: divTax + intTax,
    gainsTax,
    totalTax,
    net: total - totalTax,
    effective: totalTax / total,
    breakdown,
  };
}

// --- Brackets table (Home) ------------------------------------------------

export interface BracketRow {
  range: string;
  rate: string;
  on: string;
}

/** Display rows for the brackets table, derived from NEW_BANDS. */
export const BRACKET_ROWS: BracketRow[] = NEW_BANDS.map(([cap, rate], i) => {
  const prev = i === 0 ? 0 : NEW_BANDS[i - 1][0];
  const ratePct = `${Math.round(rate * 100)}%`;
  if (i === 0) return { range: `First ${naira(cap)}`, rate: ratePct, on: naira(0) };
  if (cap === Infinity) return { range: `Above ${naira(prev)}`, rate: ratePct, on: `${ratePct} of excess` };
  return {
    range: `${naira(prev + 1)} – ${naira(cap)}`,
    rate: ratePct,
    on: `up to ${naira((cap - prev) * rate)}`,
  };
});
