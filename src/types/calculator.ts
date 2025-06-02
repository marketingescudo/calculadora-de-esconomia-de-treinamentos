
export interface InstructorData {
  base: number;
  classCount: number;
  total: number;
}

export interface EmployeeData {
  salary: number;
  tax: number;
  total: number;
  hourCost: number;
}

export interface OpportunityCostData {
  baseUSD: number;
  baseBRL: number;
  hourCost: number;
}

export interface TrainingHoursData {
  withoutEscudo: number;
  withEscudo: number;
  totalCostWithoutEscudo: number;
  totalCostWithEscudo: number;
}

export interface ParticipantData {
  name: string;
  company: string;
}

export interface CalculatorState {
  dollarRate: number;
  instructor: InstructorData;
  employee: EmployeeData;
  opportunityCost: OpportunityCostData;
  trainingHours: TrainingHoursData;
  participant: ParticipantData;
  totalEmployeeCost: number;
  savings: number;
  currentStep: number;
  completedSteps: Set<number>;
}

export type StepStatus = 'pending' | 'current' | 'completed';
