

import React, { useState } from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calculator, DollarSign } from 'lucide-react';

export function Step4EmployeeData() {
  const { state, dispatch } = useCalculator();
  const [salaryInput, setSalaryInput] = useState(state.employee.salary > 0 ? state.employee.salary.toString() : '');

  const handleSalaryChange = (value: string) => {
    // Allow only numbers
    const cleanValue = value.replace(/[^\d]/g, '');
    setSalaryInput(cleanValue);
    
    const numericValue = parseFloat(cleanValue) || 0;
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
            <CardTitle className="flex items-center gap-2 text-escudo-dark text-lg lg:text-xl">
              <User className="h-5 w-5 text-escudo-pink" />
              Salário do Colaborador
            </CardTitle>
            <CardDescription className="text-sm lg:text-base">
              Defina o salário mensal base do colaborador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-salary" className="text-escudo-dark font-medium text-sm lg:text-base">
                Salário mensal base
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-escudo-gray-600 text-sm lg:text-base">
                  R$
                </span>
                <Input
                  id="employee-salary"
                  value={salaryInput}
                  onChange={(e) => handleSalaryChange(e.target.value)}
                  placeholder="5000"
                  className="pl-10 text-base lg:text-lg focus:ring-escudo-pink focus:border-escudo-pink"
                />
              </div>
            </div>

            {state.employee.salary > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-escudo-pink" />
                    <span className="font-medium text-escudo-dark text-sm lg:text-base">Impostos (70%)</span>
                  </div>
                  <span className="text-lg lg:text-xl font-bold text-escudo-dark">
                    {formatCurrency(state.employee.tax)}
                  </span>
                </div>

                <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-escudo-pink" />
                    <span className="font-medium text-escudo-dark text-sm lg:text-base">Total</span>
                  </div>
                  <span className="text-lg lg:text-xl font-bold text-escudo-dark">
                    {formatCurrency(state.employee.total)}
                  </span>
                </div>

                <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-escudo-dark text-sm lg:text-base">Custo por hora</span>
                  </div>
                  <span className="text-lg lg:text-xl font-bold text-escudo-pink">
                    {formatCurrency(state.employee.hourCost)}
                  </span>
                </div>

                <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-escudo-dark text-sm lg:text-base">Custo total por hora</span>
                  </div>
                  <span className="text-lg lg:text-xl font-bold text-escudo-pink">
                    {formatCurrency(state.totalEmployeeCost)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark text-lg lg:text-xl">
              <DollarSign className="h-5 w-5 text-escudo-pink" />
              Custo de Oportunidade
            </CardTitle>
            <CardDescription className="text-sm lg:text-base">
              Calculado automaticamente com base na cotação do dólar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-xs lg:text-sm text-escudo-gray-600 mb-1">Base USD</div>
                <div className="text-base lg:text-lg font-bold text-escudo-dark">
                  {formatUSD(state.opportunityCost.baseUSD)}
                </div>
              </div>

              <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-xs lg:text-sm text-escudo-gray-600 mb-1">Valor em BRL</div>
                <div className="text-base lg:text-lg font-bold text-escudo-dark">
                  {formatCurrency(state.opportunityCost.baseBRL)}
                </div>
              </div>

              <div className="p-3 lg:p-4 bg-escudo-gray-50 rounded-lg">
                <div className="text-xs lg:text-sm text-escudo-gray-600 mb-1">Custo por hora</div>
                <div className="text-base lg:text-lg font-bold text-escudo-pink">
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

