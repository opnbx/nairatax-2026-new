interface StatsCardProps {
  value: string;
  label: string;
  subtext: string;
  color: 'blue' | 'green' | 'purple';
}

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
};

/**
 * StatsCard component
 * 
 * Displays a statistic card with value, label, and subtext.
 * Used to highlight key tax information.
 * 
 * @param {string} value - Main statistic value
 * @param {string} label - Label for the statistic
 * @param {string} subtext - Additional context
 * @param {string} color - Color theme (blue, green, or purple)
 */
export function StatsCard({ value, label, subtext, color }: StatsCardProps) {
  return (
    <div 
      className="bg-gray-50 rounded-lg p-6 text-center" 
      role="listitem"
    >
      <div className={`text-2xl md:text-3xl font-bold ${colorClasses[color]} mb-2`}>
        {value}
      </div>
      <div className="text-gray-700 font-medium">
        {label}
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {subtext}
      </div>
    </div>
  );
}