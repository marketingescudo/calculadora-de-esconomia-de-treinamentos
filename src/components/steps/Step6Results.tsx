
import React from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingDown, CheckCircle, BarChart3, Download } from 'lucide-react';
import { ReportGenerator } from '../ReportGenerator';
import { EscudoLogo } from '../EscudoLogo';
import { useToast } from '@/hooks/use-toast';

export function Step6Results() {
  const { state } = useCalculator();
  const { downloadReport } = ReportGenerator();
  const { toast } = useToast();

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
    try {
      downloadReport();
      toast({
        title: "✅ Relatório baixado com sucesso!",
        description: "O arquivo HTML foi salvo em seus downloads.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao baixar relatório",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
        duration: 3000,
      });
    }
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
        <Card className="border-escudo-pink/30 bg-gradient-to-r from-escudo-pink/10 to-escudo-pink/5 rounded-xl mt-4">
          <CardHeader className="text-center px-3 sm:px-6">
            <CardTitle className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xl sm:text-2xl lg:text-3xl text-escudo-dark">
              <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-escudo-pink flex-shrink-0" />
              <span className="break-words">Sua Economia Anual</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg">
              Com treinamentos SST EaD da Escudo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center px-6 sm:px-8 py-4">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-escudo-pink mb-4 break-all">
              {formatCurrency(state.savings)}
            </div>
            <div className="text-base sm:text-lg lg:text-xl text-escudo-gray-600 px-2">
              Economia de <span className="font-bold text-escudo-pink">{savingsPercentage}%</span> em custos de treinamento
            </div>
          </CardContent>
        </Card>

        {/* Comparativo Detalhado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-600 text-base sm:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>Cenário Sem a Escudo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Custo do instrutor:</span>
                <span className="font-bold break-all text-right ml-2">{formatCurrency(state.instructor.total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Horas de treinamento:</span>
                <span className="font-bold">{state.trainingHours.withoutEscudo}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Custo por hora:</span>
                <span className="font-bold break-all text-right ml-2">{formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center text-base sm:text-lg">
                <span className="font-medium text-escudo-gray-700">Total anual:</span>
                <span className="font-bold text-red-600 break-all text-right ml-2">
                  {formatCurrency(state.trainingHours.totalCostWithoutEscudo)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-600 text-base sm:text-lg">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>Cenário Com a Escudo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Redução de horas:</span>
                <span className="font-bold text-green-600">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Horas de treinamento:</span>
                <span className="font-bold">{state.trainingHours.withEscudo}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-escudo-gray-600">Custo por hora:</span>
                <span className="font-bold break-all text-right ml-2">{formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center text-base sm:text-lg">
                <span className="font-medium text-escudo-gray-700">Total anual:</span>
                <span className="font-bold text-green-600 break-all text-right ml-2">
                  {formatCurrency(state.trainingHours.totalCostWithEscudo)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo dos Dados */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-escudo-dark text-base sm:text-lg">Resumo dos Dados Utilizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="text-center sm:text-left">
                <div className="font-medium text-escudo-gray-600 text-xs sm:text-sm">Cotação USD/BRL</div>
                <div className="text-base sm:text-lg font-bold">R$ {state.dollarRate.toFixed(2)}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-medium text-escudo-gray-600 text-xs sm:text-sm">Salário do colaborador</div>
                <div className="text-base sm:text-lg font-bold break-all">{formatCurrency(state.employee.salary)}</div>
              </div>
              <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                <div className="font-medium text-escudo-gray-600 text-xs sm:text-sm">Custo do instrutor</div>
                <div className="text-base sm:text-lg font-bold break-all">{formatCurrency(state.instructor.base)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button 
            onClick={handleDownloadReport}
            className="bg-escudo-pink hover:bg-escudo-pink/90 flex items-center gap-2 text-sm sm:text-base"
            size="sm"
          >
            <Download className="h-4 w-4" />
            Baixar Relatório
          </Button>
          <Button 
            variant="outline" 
            onClick={handleRestart}
            className="border-escudo-pink text-escudo-pink hover:bg-escudo-pink/10 text-sm sm:text-base"
            size="sm"
          >
            Nova Simulação
          </Button>
        </div>

        {/* Logo da Escudo */}
        <div className="text-center pt-6 sm:pt-8">
          <EscudoLogo size="lg" className="mx-auto mb-2" />
          <div className="text-xs sm:text-sm text-escudo-gray-500">Todos os direitos reservados</div>
        </div>
      </div>
    </StepWrapper>
  );
}
