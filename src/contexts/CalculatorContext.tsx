
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CalculatorState } from '@/types/calculator';

const initialState: CalculatorState = {
  dollarRate: 0,
  instructor: {
    base: 2000,
    classCount: 0,
    total: 0
  },
  employee: {
    salary: 0,
    tax: 0,
    total: 0,
    hourCost: 0
  },
  opportunityCost: {
    baseUSD: 16.80,
    baseBRL: 0,
    hourCost: 0
  },
  trainingHours: {
    withoutEscudo: 0,
    withEscudo: 0,
    totalCostWithoutEscudo: 0,
    totalCostWithEscudo: 0
  },
  totalEmployeeCost: 0,
  savings: 0,
  currentStep: 1,
  completedSteps: new Set()
};

type CalculatorAction = 
  | { type: 'SET_DOLLAR_RATE'; payload: number }
  | { type: 'SET_INSTRUCTOR_DATA'; payload: Partial<typeof initialState.instructor> }
  | { type: 'SET_EMPLOYEE_DATA'; payload: Partial<typeof initialState.employee> }
  | { type: 'SET_TRAINING_HOURS'; payload: number }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'COMPLETE_STEP'; payload: number }
  | { type: 'RECALCULATE' };

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_DOLLAR_RATE':
      return { ...state, dollarRate: action.payload };
    
    case 'SET_INSTRUCTOR_DATA':
      return {
        ...state,
        instructor: { ...state.instructor, ...action.payload }
      };
    
    case 'SET_EMPLOYEE_DATA':
      return {
        ...state,
        employee: { ...state.employee, ...action.payload }
      };
    
    case 'SET_TRAINING_HOURS':
      return {
        ...state,
        trainingHours: {
          ...state.trainingHours,
          withoutEscudo: action.payload,
          withEscudo: action.payload / 2
        }
      };
    
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'COMPLETE_STEP':
      return {
        ...state,
        completedSteps: new Set([...state.completedSteps, action.payload])
      };
    
    case 'RECALCULATE':
      const instructorTotal = state.instructor.base * state.instructor.classCount;
      const employeeTax = state.employee.salary * 0.7;
      const employeeTotal = state.employee.salary + employeeTax;
      const employeeHourCost = employeeTotal / 220;
      const opportunityBRL = state.opportunityCost.baseUSD * state.dollarRate;
      const totalEmployeeCost = employeeHourCost + opportunityBRL;
      const totalCostWithoutEscudo = (state.trainingHours.withoutEscudo * totalEmployeeCost) + instructorTotal;
      const totalCostWithEscudo = totalCostWithoutEscudo / 2;
      const savings = totalCostWithoutEscudo - totalCostWithEscudo;

      return {
        ...state,
        instructor: { ...state.instructor, total: instructorTotal },
        employee: {
          ...state.employee,
          tax: employeeTax,
          total: employeeTotal,
          hourCost: employeeHourCost
        },
        opportunityCost: {
          ...state.opportunityCost,
          baseBRL: opportunityBRL,
          hourCost: opportunityBRL
        },
        trainingHours: {
          ...state.trainingHours,
          totalCostWithoutEscudo,
          totalCostWithEscudo
        },
        totalEmployeeCost,
        savings
      };
    
    default:
      return state;
  }
}

const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
} | null>(null);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Auto-recalculate when relevant data changes
  useEffect(() => {
    dispatch({ type: 'RECALCULATE' });
  }, [
    state.dollarRate,
    state.instructor.base,
    state.instructor.classCount,
    state.employee.salary,
    state.trainingHours.withoutEscudo
  ]);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
