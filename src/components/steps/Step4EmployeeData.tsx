
import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calculator, DollarSign } from 'lucide-react';

export function Step4EmployeeData() {
  const { state, dispatch } = useCalculator();

  const handleSalaryChange = (value: string) => {
    // Remove all non-numeric characters except comma and period
    const cleanValue = value.replace(/[^\d,]/g, '');
    // Convert comma to period for calculation
    const numericValue = parseFloat(cleanValue.replace(',', '.')) || 0;
    dispatch({ 
      type: 'SET_EMPLOYEE_DATA', 
      payload: { salary: numericValue }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatInputValue = (value: number) => {
    if (value === 0) return '';
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const canProceed = state.employee.salary > 0;

  return (
    <StepWrapper
      title="Dados do Colaborador"
      description="Configure as informações salariais e custos dos colaboradores"
      canProceed={canProceed}
    >
      <div className="space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <User className="h-5 w-5 text-escudo-pink" />
              Salário do Colaborador
            </CardTitle>
            <CardDescription>
              Defina o salário mensal base do colaborador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-salary" className="text-escudo-dark font-medium">
                Salário mensal base
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-escudo-gray-600">
                  R$
                </span>
                <Input
                  id="employee-salary"
                  value={formatInputValue(state.employee.salary)}
                  onChange={(e) => handleSalaryChange(e.target.value)}
                  placeholder="5.000,00"
                  className="pl-10 text-lg focus:ring-escudo-pink focus:border-escudo-pink"
                />
              </div>
            </div>

            {state.employee.salary > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-escudo-pink" />
                    <span className="font-medium text-escudo-dark">Impostos (70%)</span>
                  </div>
                  <span className="text-xl font-bold text-escudo-dark">
                    {formatCurrency(state.employee.tax)}
                  </span>
                </div>

                <div className="p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-escudo-pink" />
                    <span className="font-medium text-escudo-dark">Total</span>
                  </div>
                  <span className="text-xl font-bold text-escudo-dark">
                    {formatCurrency(state.employee.total)}
                  </span>
                </div>

                <div className="p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-escudo-dark">Custo por hora</span>
                  </div>
                  <span className="text-xl font-bold text-escudo-pink">
                    {formatCurrency(state.employee.hourCost)}
                  </span>
                </div>

                <div className="p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-escudo-dark">Custo total por hora</span>
                  </div>
                  <span className="text-xl font-bold text-escudo-pink">
                    {formatCurrency(state.totalEmployeeCost)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <DollarSign className="h-5 w-5 text-escudo-pink" />
              Custo de Oportunidade
            </CardTitle>
            <CardDescription>
              Calculado automaticamente com base na cotação do dólar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-sm text-escudo-gray-600 mb-1">Base USD</div>
                <div className="text-lg font-bold text-escudo-dark">
                  {formatUSD(state.opportunityCost.baseUSD)}
                </div>
              </div>

              <div className="p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-sm text-escudo-gray-600 mb-1">Valor em BRL</div>
                <div className="text-lg font-bold text-escudo-dark">
                  {formatCurrency(state.opportunityCost.baseBRL)}
                </div>
              </div>

              <div className="p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-sm text-escudo-gray-600 mb-1">Custo por hora</div>
                <div className="text-lg font-bold text-escudo-pink">
                  {formatCurrency(state.opportunityCost.hourCost)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
