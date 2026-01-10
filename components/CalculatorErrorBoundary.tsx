'use client';
import React, { Component, ReactNode } from 'react';

interface Props { children: ReactNode; calculatorName?: string; }
interface State { hasError: boolean; }

export class CalculatorErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-red-900">Calculator Unavailable</h3>
          <p className="text-red-700 mb-4">Issue with the {this.props.calculatorName || 'calculator'}.</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-lg">Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}
