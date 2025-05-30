
import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingDown, CheckCircle, BarChart3, Download } from 'lucide-react';

export function Step6Results() {
  const { state } = useCalculator();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const savingsPercentage = state.trainingHours.totalCostWithoutEscudo > 0 
    ? ((state.savings / state.trainingHours.totalCostWithoutEscudo) * 100).toFixed(1)
    : 0;

  const handleDownloadReport = () => {
    // Implementar download do relatório
    console.log('Download do relatório solicitado');
  };

  const handleRestart = () => {
    // Reiniciar calculadora
    window.location.reload();
  };

  return (
    <StepWrapper
      title="Resultado da Análise"
      description="Sua economia calculada com treinamentos EaD"
      showNext={false}
      showBack={false}
    >
      <div className="space-y-6">
        {/* Economia Principal */}
        <Card className="border-escudo-pink/30 bg-gradient-to-r from-escudo-pink/10 to-escudo-pink/5 animate-celebration">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl text-escudo-dark">
              <TrendingDown className="h-8 w-8 text-escudo-pink" />
              Sua Economia Anual
            </CardTitle>
            <CardDescription className="text-lg">
              Com treinamentos SST EaD da Escudo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-escudo-pink mb-4 animate-pulse-glow">
              {formatCurrency(state.savings)}
            </div>
            <div className="text-xl text-escudo-gray-600">
              Economia de <span className="font-bold text-escudo-pink">{savingsPercentage}%</span> em custos de treinamento
            </div>
          </CardContent>
        </Card>

        {/* Comparativo Detalhado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <BarChart3 className="h-5 w-5" />
                Cenário Sem a Escudo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Custo do instrutor:</span>
                <span className="font-bold">{formatCurrency(state.instructor.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Horas de treinamento:</span>
                <span className="font-bold">{state.trainingHours.withoutEscudo}h</span>
              </div>
              <div className="flex justify-between">
                <span>Custo por hora:</span>
                <span className="font-bold">{formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total anual:</span>
                <span className="font-bold text-red-600">
                  {formatCurrency(state.trainingHours.totalCostWithoutEscudo)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Cenário Com a Escudo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Redução de horas:</span>
                <span className="font-bold text-green-600">50%</span>
              </div>
              <div className="flex justify-between">
                <span>Horas de treinamento:</span>
                <span className="font-bold">{state.trainingHours.withEscudo}h</span>
              </div>
              <div className="flex justify-between">
                <span>Custo por hora:</span>
                <span className="font-bold">{formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total anual:</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(state.trainingHours.totalCostWithEscudo)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo dos Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-escudo-dark">Resumo dos Dados Utilizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-escudo-gray-600">Cotação USD/BRL</div>
                <div className="text-lg font-bold">R$ {state.dollarRate.toFixed(2)}</div>
              </div>
              <div>
                <div className="font-medium text-escudo-gray-600">Salário do colaborador</div>
                <div className="text-lg font-bold">{formatCurrency(state.employee.salary)}</div>
              </div>
              <div>
                <div className="font-medium text-escudo-gray-600">Custo do instrutor</div>
                <div className="text-lg font-bold">{formatCurrency(state.instructor.base)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleDownloadReport}
            className="bg-escudo-pink hover:bg-escudo-pink/90 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Baixar Relatório
          </Button>
          <Button 
            variant="outline" 
            onClick={handleRestart}
            className="border-escudo-pink text-escudo-pink hover:bg-escudo-pink/10"
          >
            Nova Simulação
          </Button>
        </div>

        {/* Logo da Escudo */}
        <div className="text-center pt-8">
          <div className="text-2xl font-bold text-escudo-dark">Escudo Treinamentos</div>
          <div className="text-escudo-gray-600">Especialistas em SST EaD</div>
        </div>
      </div>
    </StepWrapper>
  );
}
