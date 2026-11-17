import { pct } from '@/lib/tax-engine';
import { salaryFigures } from '@/lib/salary-pages';

/** Homepage FAQ. Shared by the visible accordion and the FAQPage structured data. */
export const FAQS = [
  { q: 'How much tax is deducted from my salary?', a: `It depends on what you earn. PAYE is 0% on the first ₦800,000 of taxable income a year and 15% to 25% on the rest, after pension, NHF and reliefs are taken off. On ₦500,000 a month that is ${pct(salaryFigures(500000).effective)} of gross pay. Enter your salary above for your own figure.` },
  { q: 'What is the tax-free threshold?', a: 'The first ₦800,000 of annual income is completely tax-free. If you earn ₦800,000 or less, you pay zero income tax. This has applied since 1 January 2026.' },
  { q: 'What are the 2026 tax rates?', a: 'Progressive rates apply: 0% on the first ₦800,000, then 15%, 18%, 21%, 23% and finally 25% on income above ₦50 million.' },
  { q: 'How does rent relief work?', a: 'You can deduct 20% of the annual rent you pay, up to a maximum of ₦500,000. This is a new benefit introduced under the 2026 law.' },
  { q: 'What can employees deduct?', a: 'Pension (8%), NHF (2.5%), NHIS, life-insurance premiums and rent relief (20%, up to ₦500,000) are all deducted before tax is calculated.' },
  { q: 'Is pension income taxed?', a: 'No. Pensions, gratuities and other retirement benefits paid under the Pension Reform Act are exempt from income tax. Other income you earn in retirement is taxed at the standard bands.' },
  { q: 'When did this take effect?', a: 'The Nigeria Tax Act 2025 took effect on 1 January 2026. It is administered by the Nigeria Revenue Service (NRS), which replaced the FIRS.' },
  { q: 'Is NairaTax an official NRS or FIRS calculator?', a: 'No. NairaTax is an independent, free estimator built on the published rates and reliefs in the Nigeria Tax Act 2025. For a binding assessment, consult the Nigeria Revenue Service or a qualified tax professional.' },
];
