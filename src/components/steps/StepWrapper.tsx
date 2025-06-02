
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCalculator } from '@/contexts/CalculatorContext';

interface StepWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  showBack?: boolean;
  showNext?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  currentStep?: number;
  totalSteps?: number;
  isLoading?: boolean;
  nextButtonText?: string;
  canProceed?: boolean;
}

export function StepWrapper({
  title,
  description,
  children,
  showBack = true,
  showNext = true,
  onBack,
  onNext,
  isLoading = false,
  nextButtonText = 'Continuar',
  canProceed = true
}: StepWrapperProps) {
  const { state, dispatch } = useCalculator();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (state.currentStep > 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 });
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (state.currentStep < 6) {
      dispatch({ type: 'COMPLETE_STEP', payload: state.currentStep });
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Main Content Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-escudo-dark">
            {title}
          </h1>
          {description && (
            <p className="text-escudo-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </CardHeader>

        <CardContent className="px-6 pb-8">
          {children}
        </CardContent>

        {/* Navigation */}
        {(showBack || showNext) && (
          <div className="flex justify-between items-center p-6 pt-0">
            {showBack ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2 hover:bg-escudo-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            ) : (
              <div />
            )}

            {showNext && (
              <Button
                onClick={handleNext}
                disabled={isLoading || !canProceed}
                className="flex items-center space-x-2 bg-escudo-pink hover:bg-escudo-pink/90 text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Processando...' : nextButtonText}</span>
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
