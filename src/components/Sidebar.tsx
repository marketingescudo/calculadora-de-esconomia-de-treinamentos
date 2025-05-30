
import React from 'react';
import { Check, Circle, Play } from 'lucide-react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { StepStatus } from '@/types/calculator';

const steps = [
  { id: 1, title: 'Introdução', description: 'Bem-vindo à calculadora' },
  { id: 2, title: 'Cotação Dólar', description: 'Configure a cotação atual' },
  { id: 3, title: 'Dados Instrutor', description: 'Custo por turma' },
  { id: 4, title: 'Dados Colaborador', description: 'Salário e impostos' },
  { id: 5, title: 'Horas Treinamento', description: 'Compare cenários' },
  { id: 6, title: 'Resultado', description: 'Sua economia calculada' }
];

function getStepStatus(stepId: number, currentStep: number, completedSteps: Set<number>): StepStatus {
  if (completedSteps.has(stepId)) return 'completed';
  if (stepId === currentStep) return 'current';
  return 'pending';
}

function StepIcon({ status }: { status: StepStatus }) {
  switch (status) {
    case 'completed':
      return <Check className="h-4 w-4 text-white" />;
    case 'current':
      return <Play className="h-4 w-4 text-white" />;
    default:
      return <Circle className="h-4 w-4 text-escudo-gray-400" />;
  }
}

export function Sidebar() {
  const { state, dispatch } = useCalculator();
  const progressPercentage = (state.completedSteps.size / steps.length) * 100;

  const handleStepClick = (stepId: number) => {
    if (state.completedSteps.has(stepId) || stepId === state.currentStep) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: stepId });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-escudo-gray-200 h-screen flex flex-col fixed left-0 top-0 z-10">
      {/* Header */}
      <div className="p-6 border-b border-escudo-gray-200 flex-shrink-0">
        <h1 className="text-2xl font-bold text-escudo-dark">Calculadora Escudo</h1>
        <p className="text-sm text-escudo-gray-600 mt-1">
          Calcule sua economia com treinamentos EaD
        </p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-escudo-gray-600 mb-2">
            <span>Progresso</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-escudo-gray-200 rounded-full h-2">
            <div 
              className="bg-escudo-pink h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {steps.map((step) => {
            const status = getStepStatus(step.id, state.currentStep, state.completedSteps);
            const isClickable = status === 'completed' || status === 'current';
            
            return (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${status === 'current' ? 'bg-escudo-pink/10 border border-escudo-pink/20' : ''}
                  ${status === 'completed' ? 'bg-escudo-gray-50 hover:bg-escudo-gray-100' : ''}
                  ${status === 'pending' ? 'opacity-60 cursor-not-allowed' : ''}
                  ${isClickable ? 'hover:shadow-sm' : ''}
                `}
              >
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full mr-3 transition-colors
                  ${status === 'completed' ? 'bg-green-500' : ''}
                  ${status === 'current' ? 'bg-escudo-pink' : ''}
                  ${status === 'pending' ? 'bg-escudo-gray-200' : ''}
                `}>
                  <StepIcon status={status} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`
                    font-semibold text-sm
                    ${status === 'current' ? 'text-escudo-pink' : 'text-escudo-dark'}
                    ${status === 'pending' ? 'text-escudo-gray-400' : ''}
                  `}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-escudo-gray-600 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-escudo-gray-200 flex-shrink-0">
        <div className="text-center">
          <div className="text-xs text-escudo-gray-500">Powered by</div>
          <div className="text-sm font-bold text-escudo-dark">Escudo Treinamentos</div>
        </div>
      </div>
    </div>
  );
}
