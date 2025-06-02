
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Step1ParticipantData } from './steps/Step1ParticipantData';
import { Step2Introduction } from './steps/Step2Introduction';
import { Step2DollarRate } from './steps/Step2DollarRate';
import { Step3InstructorData } from './steps/Step3InstructorData';
import { Step4EmployeeData } from './steps/Step4EmployeeData';
import { Step5TrainingHours } from './steps/Step5TrainingHours';
import { Step6Results } from './steps/Step6Results';

export function StepRouter() {
  const { state } = useCalculator();

  switch (state.currentStep) {
    case 1:
      return <Step1ParticipantData />;
    case 2:
      return <Step2Introduction />;
    case 3:
      return <Step2DollarRate />;
    case 4:
      return <Step3InstructorData />;
    case 5:
      return <Step4EmployeeData />;
    case 6:
      return <Step5TrainingHours />;
    case 7:
      return <Step6Results />;
    default:
      return <Step1ParticipantData />;
  }
}
