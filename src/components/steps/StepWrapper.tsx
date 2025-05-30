
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalculator } from '@/contexts/CalculatorContext';

interface StepWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  canProceed?: boolean;
  showBack?: boolean;
  showNext?: boolean;
  onNext?: () => void;
  onBack?: () => void;
}

export function StepWrapper({ 
  children, 
  title, 
  description,
  canProceed = true,
  showBack = true,
  showNext = true,
  onNext,
  onBack
}: StepWrapperProps) {
  const { state, dispatch } = useCalculator();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (state.currentStep < 6) {
      dispatch({ type: 'COMPLETE_STEP', payload: state.currentStep });
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (state.currentStep > 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 });
    }
  };

  return (
    <div className="flex-1 flex flex-col animate-slide-in-right ml-80">
      {/* Header */}
      <div className="bg-white border-b border-escudo-gray-200 px-8 py-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-escudo-dark mb-2">{title}</h1>
          {description && (
            <p className="text-escudo-gray-600 text-lg">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-escudo-gray-50">
        <div className="max-w-4xl mx-auto p-8">
          {children}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-escudo-gray-200 px-8 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            {showBack && state.currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            )}
          </div>

          <div className="text-sm text-escudo-gray-500">
            Etapa {state.currentStep} de 6
          </div>

          <div>
            {showNext && state.currentStep < 6 && (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-escudo-pink hover:bg-escudo-pink/90"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
