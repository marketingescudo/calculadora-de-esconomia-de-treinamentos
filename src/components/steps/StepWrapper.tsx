
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
}

export function StepWrapper({
  title,
  description,
  children,
  showBack = true,
  showNext = true,
  onBack,
  onNext,
  currentStep = 1,
  totalSteps = 6,
  isLoading = false,
  nextButtonText = 'Continuar'
}: StepWrapperProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-4 lg:pt-0">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-escudo-gray-600">
          <span>Passo {currentStep} de {totalSteps}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 bg-escudo-gray-200"
        />
      </div>

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
                onClick={onBack}
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
                onClick={onNext}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-escudo-pink hover:bg-escudo-pink/90 text-white px-6"
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
