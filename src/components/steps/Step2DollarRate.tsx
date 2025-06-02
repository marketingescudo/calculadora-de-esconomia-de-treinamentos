import React, { useEffect, useState } from 'react';
import { DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { toast } from '@/hooks/use-toast';

export function Step2DollarRate() {
  const { state, dispatch } = useCalculator();
  const [loading, setLoading] = useState(false);
  const [manualRate, setManualRate] = useState(state.dollarRate.toString());

  const fetchDollarRate = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const daysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);
      
      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      };

      const todayStr = formatDate(today);
      const daysAgoStr = formatDate(daysAgo);

      const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${daysAgoStr}'&@dataFinalCotacao='${todayStr}'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra,dataHoraCotacao`;

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.value && data.value.length > 0) {
        const rate = data.value[0].cotacaoCompra;
        dispatch({ type: 'SET_DOLLAR_RATE', payload: rate });
        setManualRate(rate.toFixed(2));
        toast({
          title: "Cotação atualizada",
          description: "Cotação do dólar carregada com sucesso!",
        });
      }
    } catch (error) {
      console.error('Erro ao buscar cotação:', error);
      dispatch({ type: 'SET_DOLLAR_RATE', payload: 5.50 });
      setManualRate("5.50");
      toast({
        title: "Erro na cotação",
        description: "Usando cotação padrão do dólar.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualChange = (value: string) => {
    setManualRate(value);
    const numValue = parseFloat(value.replace(',', '.'));
    if (!isNaN(numValue)) {
      dispatch({ type: 'SET_DOLLAR_RATE', payload: numValue });
    }
  };

  useEffect(() => {
    if (state.dollarRate === 0) {
      fetchDollarRate();
    }
  }, []);

  const formatCurrency = (value: number, currency = 'BRL') => {
    if (currency === 'USD') {
      return `U$ ${value.toFixed(2)}`;
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <StepWrapper
      title="Cotação do Dólar"
      description="Precisamos da cotação atual para calcular o custo de oportunidade"
    >
      <div className="space-y-6 animate-fade-in">
        <Card className="border-escudo-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <DollarSign className="h-5 w-5 text-escudo-pink" />
              Cotação Automática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-escudo-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-escudo-dark">USD/BRL</div>
                <div className="text-2xl font-bold text-escudo-pink">
                  {state.dollarRate > 0 ? formatCurrency(state.dollarRate, 'USD') : '--'}
                </div>
              </div>
              <Button
                onClick={fetchDollarRate}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Carregando...' : 'Atualizar'}
              </Button>
            </div>
            
            {state.dollarRate > 0 && (
              <div className="text-sm text-escudo-gray-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Cotação obtida do Banco Central do Brasil
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-escudo-gray-500">ou</div>

        <Card className="border-escudo-gray-200">
          <CardHeader>
            <CardTitle className="text-escudo-dark">Inserção Manual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-escudo-dark mb-2">
                  Cotação USD/BRL
                </label>
                <Input
                  type="text"
                  value={manualRate}
                  onChange={(e) => handleManualChange(e.target.value)}
                  placeholder="Ex: 5.50"
                  className="text-center text-lg font-semibold"
                />
              </div>
              
              <div className="text-sm text-escudo-gray-600">
                Você pode inserir manualmente a cotação se preferir usar uma fonte específica.
              </div>
            </div>
          </CardContent>
        </Card>

        {state.dollarRate > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-scale-in">
            <div className="flex items-center gap-2 text-green-800">
              <DollarSign className="h-5 w-5" />
              <span className="font-semibold">Cotação definida com sucesso!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Usando {formatCurrency(state.dollarRate, 'USD')} para os cálculos.
            </p>
          </div>
        )}
      </div>
    </StepWrapper>
  );
}
