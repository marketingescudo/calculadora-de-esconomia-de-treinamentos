import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingDown, Zap } from 'lucide-react';

export function Step5TrainingHours() {
  const { state, dispatch } = useCalculator();

  const handleHoursChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    dispatch({ 
      type: 'SET_TRAINING_HOURS', 
      payload: numericValue
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const canProceed = state.trainingHours.withoutEscudo > 0;

  return (
    <StepWrapper
      title="Horas de Treinamento"
      description="Compare os cenários com e sem a Escudo"
    >
      <div className="space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <Clock className="h-5 w-5 text-escudo-pink" />
              Horas de Treinamento Anuais
            </CardTitle>
            <CardDescription>
              Informe quantas horas de treinamento são necessárias por ano
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="training-hours" className="text-escudo-dark font-medium">
                Horas anuais sem a Escudo
              </Label>
              <Input
                id="training-hours"
                type="number"
                min="1"
                value={state.trainingHours.withoutEscudo || ''}
                onChange={(e) => handleHoursChange(e.target.value)}
                placeholder="40"
                className="text-lg focus:ring-escudo-pink focus:border-escudo-pink"
              />
            </div>

            {state.trainingHours.withoutEscudo > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-600 text-lg">
                      <Clock className="h-5 w-5" />
                      Sem a Escudo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-escudo-gray-600">Horas:</span>
                        <span className="font-bold">{state.trainingHours.withoutEscudo}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-escudo-gray-600">Custo total:</span>
                        <span className="font-bold text-red-600">
                          {formatCurrency(state.trainingHours.totalCostWithoutEscudo)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-600 text-lg">
                      <Zap className="h-5 w-5" />
                      Com a Escudo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-escudo-gray-600">Horas:</span>
                        <span className="font-bold">{state.trainingHours.withEscudo}h</span>
                        <span className="text-green-600 text-sm">(-50%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-escudo-gray-600">Custo total:</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(state.trainingHours.totalCostWithEscudo)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {state.savings > 0 && (
              <Card className="border-escudo-pink/30 bg-escudo-pink/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-escudo-pink" />
                      <span className="text-lg font-medium text-escudo-dark">
                        Economia prevista:
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-escudo-pink">
                      {formatCurrency(state.savings)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
