
import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users } from 'lucide-react';

export function Step3InstructorData() {
  const { state, dispatch } = useCalculator();

  const handleBaseChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    dispatch({ 
      type: 'SET_INSTRUCTOR_DATA', 
      payload: { base: numericValue }
    });
  };

  const handleClassCountChange = (value: string) => {
    const numericValue = parseInt(value) || 0;
    dispatch({ 
      type: 'SET_INSTRUCTOR_DATA', 
      payload: { classCount: numericValue }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const canProceed = state.instructor.base > 0 && state.instructor.classCount > 0;

  return (
    <StepWrapper
      title="Dados do Instrutor"
      description="Configure os custos relacionados ao instrutor"
      canProceed={canProceed}
    >
      <div className="space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <GraduationCap className="h-5 w-5 text-escudo-pink" />
              Custo do Instrutor
            </CardTitle>
            <CardDescription>
              Defina o custo base por turma e a quantidade de turmas necessárias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor-base" className="text-escudo-dark font-medium">
                  Custo base por turma
                </Label>
                <Input
                  id="instructor-base"
                  value={state.instructor.base > 0 ? formatCurrency(state.instructor.base) : ''}
                  onChange={(e) => handleBaseChange(e.target.value)}
                  placeholder="R$ 2.000,00"
                  className="text-lg focus:ring-escudo-pink focus:border-escudo-pink"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor-classes" className="text-escudo-dark font-medium">
                  Quantidade de turmas
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-escudo-gray-500" />
                  <Input
                    id="instructor-classes"
                    type="number"
                    min="1"
                    value={state.instructor.classCount || ''}
                    onChange={(e) => handleClassCountChange(e.target.value)}
                    placeholder="1"
                    className="pl-10 text-lg focus:ring-escudo-pink focus:border-escudo-pink"
                  />
                </div>
              </div>
            </div>

            {state.instructor.total > 0 && (
              <div className="mt-6 p-4 bg-escudo-pink/10 rounded-lg border border-escudo-pink/20">
                <div className="flex justify-between items-center">
                  <span className="text-escudo-dark font-medium">Total do instrutor:</span>
                  <span className="text-2xl font-bold text-escudo-pink">
                    {formatCurrency(state.instructor.total)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
