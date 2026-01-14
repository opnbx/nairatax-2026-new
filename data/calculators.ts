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
    description: 'Company Income Tax (CIT) 30% + 2% Education Tax. Small companies ≤₦50M pay 0% (non-professional services).',
    href: '/calculators/business',
    icon: '🏢',
    features: ['CIT 30%', 'Education Tax 2%', 'Small company 0%']
  },
  {
    title: 'Content Creator Tax',
    description: 'Tax calculator for YouTube, Instagram, TikTok income. Platform-specific deductions included.',
    href: '/calculators/creator',
    icon: '📱',
    features: ['Social media income', 'Equipment costs', 'Production expenses']
  },
  {
    title: 'Investment Income Tax',
    description: 'Calculate tax on dividends, interest, capital gains. All income types covered with WHT calculations.',
    href: '/calculators/investment',
    icon: '📊',
    features: ['Dividend WHT 10%', 'Interest WHT 10%', 'Capital gains 10%']
  }
];