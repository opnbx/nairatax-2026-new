import { CalculatorCardProps } from '@/components/CalculatorCard';

/**
 * Calculator data
 * 
 * Central source of truth for all calculator types.
 * Used to generate calculator cards and navigation.
 */
export const CALCULATORS: CalculatorCardProps[] = [
  {
    title: 'Freelancer Tax Calculator',
    description: 'Self-employed tax with business expense deductions. Perfect for consultants and independent contractors.',
    href: '/calculators/freelancer',
    icon: '💼',
    features: ['Business expenses', 'Progressive rates', 'Self-assessment']
  },
  {
    title: 'Business Tax Calculator',
    description: 'Company Income Tax (CIT) 30% + 4% levy. Small companies ≤₦50M pay 0% (non-professional services).',
    href: '/calculators/business',
    icon: '🏢',
    features: ['CIT 30%', 'Development levy 4%', 'Small company 0%']
  },
  {
    title: 'Content Creator Tax',
    description: 'Tax calculator for YouTube, Instagram, TikTok income. Platform-specific deductions included.',
    href: '/calculators/creator',
    icon: '📱',
    features: ['Social media income', 'Equipment costs', 'Foreign currency']
  },
  {
    title: 'Investment Income Tax',
    description: 'Calculate tax on dividends, interest, capital gains. Includes 10% WHT credit tracking.',
    href: '/calculators/investment',
    icon: '📊',
    features: ['Dividend tax', 'Interest income', 'Capital gains 10%']
  },
  {
    title: 'Pensioner Tax Calculator',
    description: 'Retirement income tax with special ₦200,000 pensioner benefit. Gratuity exemption included.',
    href: '/calculators/pensioner',
    icon: '👴',
    features: ['₦200K benefit', 'Gratuity exempt', 'Pension income']
  },
  {
    title: 'Partnership Tax Calculator',
    description: 'Business partnership tax with profit allocation. Pass-through taxation for partners.',
    href: '/calculators/partnership',
    icon: '🤝',
    features: ['Profit allocation', 'Pass-through tax', 'Partner shares']
  }
];