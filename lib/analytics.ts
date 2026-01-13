/**
 * Google Analytics Event Tracking Utilities
 * 
 * Use these functions to track user interactions with calculators.
 */

/**
 * Track when a user starts using a calculator
 */
export function trackCalculatorStarted(calculatorType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_started', {
      event_category: 'calculator',
      event_label: calculatorType,
    });
  }
}

/**
 * Track when a user completes a calculation
 */
export function trackCalculationComplete(params: {
  calculatorType: string;
  income?: number;
  taxAmount?: number;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculation_complete', {
      event_category: 'calculator',
      event_label: params.calculatorType,
      value: params.taxAmount,
    });
  }
}

/**
 * Track when a user downloads/saves their calculation
 */
export function trackCalculationSaved(calculatorType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculation_saved', {
      event_category: 'calculator',
      event_label: calculatorType,
    });
  }
}

/**
 * Track calculator errors
 */
export function trackCalculatorError(params: {
  calculatorType: string;
  errorMessage: string;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_error', {
      event_category: 'error',
      event_label: params.calculatorType,
      value: params.errorMessage,
    });
  }
}

/**
 * Track when user clicks on a calculator card
 */
export function trackCalculatorCardClick(calculatorType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_card_click', {
      event_category: 'engagement',
      event_label: calculatorType,
    });
  }
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
}