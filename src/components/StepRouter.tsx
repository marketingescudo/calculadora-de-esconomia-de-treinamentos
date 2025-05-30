
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Step1Introduction } from './steps/Step1Introduction';
import { Step2DollarRate } from './steps/Step2DollarRate';

export function StepRouter() {
  const { state } = useCalculator();

  switch (state.currentStep) {
    case 1:
      return <Step1Introduction />;
    case 2:
      return <Step2DollarRate />;
    default:
      return <Step1Introduction />;
  }
}
