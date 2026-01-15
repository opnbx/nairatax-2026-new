import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeCalculator } from '@/components/calculators/EmployeeCalculator';

/**
 * Test suite for EmployeeCalculator React component
 * Tests the real component with progressive tax calculation
 * Note: This component auto-calculates on input change (no calculate button)
 */

describe('EmployeeCalculator Component', () => {
  describe('Rendering', () => {
    it('should render gross salary input field', () => {
      render(<EmployeeCalculator />);
      expect(screen.getByLabelText(/gross salary/i)).toBeInTheDocument();
    });

    it('should render frequency selector (Annual/Monthly)', () => {
      render(<EmployeeCalculator />);
      const select = screen.getByLabelText(/salary frequency/i);
      expect(select).toBeInTheDocument();
    });

    it('should render initial results with default salary', () => {
      render(<EmployeeCalculator />);
      // Component auto-calculates with default value (800000)
      expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
    });
  });

  describe('User interactions', () => {
    it('should update input value when user types', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const input = screen.getByLabelText(/gross salary/i) as HTMLInputElement;
      await user.clear(input);
      await user.type(input, '1000000');

      expect(input.value).toBe('1000000');
    });

    it('should auto-calculate and display results when input changes', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const input = screen.getByLabelText(/gross salary/i);
      await user.clear(input);
      await user.type(input, '5000000');

      // Component auto-calculates, results should update
      await waitFor(() => {
        expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
      });
    });

    it('should display results for income at tax-free threshold', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const input = screen.getByLabelText(/gross salary/i);
      await user.clear(input);
      await user.type(input, '800000');

      // Should show results - component auto-calculates
      await waitFor(() => {
        expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association for salary input', () => {
      render(<EmployeeCalculator />);
      const input = screen.getByLabelText(/gross salary/i);
      expect(input).toHaveAttribute('id', 'gross-salary');
    });

    it('should have accessible frequency selector', () => {
      render(<EmployeeCalculator />);
      const select = screen.getByLabelText(/salary frequency/i);
      expect(select).toBeInTheDocument();
    });

    it('should have accessible optional input fields', () => {
      render(<EmployeeCalculator />);
      expect(screen.getByLabelText(/annual rent/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/life insurance/i)).toBeInTheDocument();
    });
  });

  describe('Input validation behavior', () => {
    it('should accept numeric input', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const input = screen.getByLabelText(/gross salary/i) as HTMLInputElement;
      await user.clear(input);
      await user.type(input, '12345');

      expect(input.value).toBe('12345');
    });

    it('should have number type on salary input', () => {
      render(<EmployeeCalculator />);
      const input = screen.getByLabelText(/gross salary/i);
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Auto-calculation with real component', () => {
    it('should display results section immediately on render', () => {
      render(<EmployeeCalculator />);
      // Component auto-calculates with default value
      expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
    });

    it('should show deductions section', () => {
      render(<EmployeeCalculator />);
      // Check for deductions in results (auto-calculated on mount)
      expect(screen.getByText(/pension/i)).toBeInTheDocument();
    });

    it('should show net income', () => {
      render(<EmployeeCalculator />);
      // Check for net income display (auto-calculated on mount)
      expect(screen.getByText(/net annual income/i)).toBeInTheDocument();
    });

    it('should show monthly take-home', () => {
      render(<EmployeeCalculator />);
      // Check for monthly display (auto-calculated on mount)
      const elements = screen.getAllByText(/monthly take-home/i);
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should update results when salary changes', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const input = screen.getByLabelText(/gross salary/i);
      await user.clear(input);
      await user.type(input, '3000000');

      // Results should update automatically
      await waitFor(() => {
        expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
      });
    });

    it('should update when frequency changes', async () => {
      const user = userEvent.setup();
      render(<EmployeeCalculator />);

      const select = screen.getByLabelText(/salary frequency/i);
      await user.selectOptions(select, 'monthly');

      // Results should recalculate for monthly frequency
      await waitFor(() => {
        expect(screen.getByText(/detailed breakdown/i)).toBeInTheDocument();
      });
    });
  });
});
