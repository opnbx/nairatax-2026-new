import Link from 'next/link';

export interface CalculatorCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  features: string[];
}

/**
 * CalculatorCard component
 * 
 * Displays a card for each calculator type with icon, description, and features.
 * 
 * @param {string} title - Calculator name
 * @param {string} description - Brief description
 * @param {string} href - Link to calculator page
 * @param {string} icon - Emoji icon
 * @param {string[]} features - List of key features
 */
export function CalculatorCard({ 
  title, 
  description, 
  href, 
  icon, 
  features 
}: CalculatorCardProps) {
  return (
    <Link 
      href={href}
      className="block bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition group"
      role="listitem"
      aria-label={`${title} - ${description}`}
    >
      <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      <ul className="space-y-1 text-sm text-gray-500 mb-4" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <span className="text-green-600 mr-2 text-xs flex-shrink-0" aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition">
        Calculate Now →
      </div>
    </Link>
  );
}