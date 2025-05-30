
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Calculator, TrendingDown, Users, Clock, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [dollarRate, setDollarRate] = useState(0);
  const [instructorBase, setInstructorBase] = useState(2000);
  const [classCount, setClassCount] = useState(0);
  const [employeeSalary, setEmployeeSalary] = useState(0);
  const [opportunityCost] = useState(16.80);
  const [hoursWithoutEscudo, setHoursWithoutEscudo] = useState(0);
  
  // Calculated values
  const [instructorTotal, setInstructorTotal] = useState(0);
  const [employeeTax, setEmployeeTax] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [employeeHourCost, setEmployeeHourCost] = useState(0);
  const [opportunityCostBRL, setOpportunityCostBRL] = useState(0);
  const [totalEmployeeCost, setTotalEmployeeCost] = useState(0);
  const [totalCostWithoutEscudo, setTotalCostWithoutEscudo] = useState(0);
  const [totalCostWithEscudo, setTotalCostWithEscudo] = useState(0);
  const [savings, setSavings] = useState(0);

  const formatCurrency = (value: number, currency = 'BRL') => {
    if (currency === 'USD') {
      return `U$ ${value.toFixed(2)}`;
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const fetchDollarRate = async () => {
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
        setDollarRate(data.value[0].cotacaoCompra);
        toast({
          title: "Cotação atualizada",
          description: "Cotação do dólar carregada com sucesso!",
        });
      }
    } catch (error) {
      console.error('Erro ao buscar cotação:', error);
      setDollarRate(5.50); // Valor padrão
      toast({
        title: "Erro na cotação",
        description: "Usando cotação padrão do dólar.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchDollarRate();
  }, []);

  useEffect(() => {
    // Recalcular valores sempre que algum input mudar
    const newInstructorTotal = instructorBase * classCount;
    setInstructorTotal(newInstructorTotal);

    const newEmployeeTax = employeeSalary * 0.7;
    setEmployeeTax(newEmployeeTax);
    
    const newEmployeeTotal = employeeSalary + newEmployeeTax;
    setEmployeeTotal(newEmployeeTotal);
    
    const newEmployeeHourCost = newEmployeeTotal / 220;
    setEmployeeHourCost(newEmployeeHourCost);
    
    const newOpportunityCostBRL = opportunityCost * dollarRate;
    setOpportunityCostBRL(newOpportunityCostBRL);
    
    const newTotalEmployeeCost = newEmployeeHourCost + newOpportunityCostBRL;
    setTotalEmployeeCost(newTotalEmployeeCost);
    
    const newTotalCostWithoutEscudo = (hoursWithoutEscudo * newTotalEmployeeCost) + newInstructorTotal;
    setTotalCostWithoutEscudo(newTotalCostWithoutEscudo);
    
    const newTotalCostWithEscudo = newTotalCostWithoutEscudo / 2;
    setTotalCostWithEscudo(newTotalCostWithEscudo);
    
    const newSavings = newTotalCostWithoutEscudo - newTotalCostWithEscudo;
    setSavings(newSavings);
  }, [instructorBase, classCount, employeeSalary, dollarRate, hoursWithoutEscudo, opportunityCost]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-montserrat">
      {/* Header */}
      <div className="bg-escudo-dark rounded-t-[30px] mx-auto mt-12 px-6 py-10 text-white text-center shadow-2xl animate-fade-in"
           style={{ width: '1140px', maxWidth: 'calc(100% - 60px)' }}>
        <h1 className="text-5xl font-semibold mb-4">Calculadora Escudo</h1>
        <h2 className="text-4xl font-medium">
          Quanto você economiza <br />
          com treinamentos SST EaD?
        </h2>
      </div>

      {/* Dollar Rate Display */}
      <div className="flex justify-center gap-4 -mt-6 mb-4 animate-scale-in">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-lg font-montserrat font-bold text-escudo-dark">
          Cotação dólar
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-lg font-montserrat font-bold text-escudo-dark">
          USD/BRL
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-lg font-montserrat font-bold text-escudo-dark flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {formatCurrency(dollarRate, 'USD')}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl mx-auto shadow-2xl p-12 animate-fade-in"
           style={{ width: '1140px', maxWidth: 'calc(100% - 30px)', marginTop: '-15px' }}>
        
        {/* Instructor Cost Section */}
        <Card className="mb-8 border-2 border-escudo-pink/20 hover:border-escudo-pink/40 transition-all duration-300">
          <CardHeader className="bg-escudo-pink text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Custo do Instrutor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <Label className="text-escudo-dark font-bold">Base</Label>
                <Input
                  type="number"
                  value={instructorBase}
                  onChange={(e) => setInstructorBase(Number(e.target.value))}
                  className="font-bold text-center border-2 focus:border-escudo-pink"
                />
                <div className="text-sm text-gray-600 mt-1">{formatCurrency(instructorBase)}</div>
              </div>
              <div>
                <Label className="text-escudo-dark font-bold">Quantidade de turmas</Label>
                <Input
                  type="number"
                  value={classCount}
                  onChange={(e) => setClassCount(Number(e.target.value))}
                  className="font-bold text-center border-2 focus:border-escudo-pink"
                />
              </div>
              <div>
                <Label className="text-escudo-dark font-bold">Total</Label>
                <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border-2">
                  {formatCurrency(instructorTotal)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Cost Section */}
        <Card className="mb-8 border-2 border-escudo-pink/20 hover:border-escudo-pink/40 transition-all duration-300">
          <CardHeader className="bg-escudo-pink text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              Custos do Colaborador
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Employee Salary Row */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-1">
                  <Label className="text-escudo-dark font-bold">Salário mensal do colaborador</Label>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Base</Label>
                  <Input
                    type="number"
                    value={employeeSalary}
                    onChange={(e) => setEmployeeSalary(Number(e.target.value))}
                    className="font-bold text-center border-2 focus:border-escudo-pink"
                  />
                  <div className="text-xs text-gray-600 mt-1">{formatCurrency(employeeSalary)}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Impostos</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(employeeTax)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Total</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(employeeTotal)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Custo hora</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(employeeHourCost)}
                  </div>
                </div>
              </div>
              
              {/* Opportunity Cost Row */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-1">
                  <Label className="text-escudo-dark font-bold">Custo oportunidade</Label>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Base (USD)</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    U$ {opportunityCost.toFixed(2)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Em BRL</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(opportunityCostBRL)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Total</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(opportunityCostBRL)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Custo hora</Label>
                  <div className="h-10 bg-gray-100 rounded-md flex items-center justify-center font-bold text-escudo-dark border">
                    {formatCurrency(opportunityCostBRL)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Custo total</Label>
                  <div className="h-10 bg-escudo-pink/10 rounded-md flex items-center justify-center font-bold text-escudo-pink border-2 border-escudo-pink/30">
                    {formatCurrency(totalEmployeeCost)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Hours Comparison */}
        <Card className="mb-8 border-2 border-escudo-pink/20 hover:border-escudo-pink/40 transition-all duration-300">
          <CardHeader className="bg-escudo-pink text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Comparação de Horas de Treinamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-escudo-dark font-bold">
                    Horas de treinamento ao ano <span className="text-escudo-pink">sem</span> a Escudo
                  </Label>
                  <Input
                    type="number"
                    value={hoursWithoutEscudo}
                    onChange={(e) => setHoursWithoutEscudo(Number(e.target.value))}
                    className="font-bold text-center border-2 focus:border-escudo-pink"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Valor total sem Escudo</Label>
                  <div className="h-12 bg-red-50 rounded-md flex items-center justify-center font-bold text-red-700 border-2 border-red-200">
                    {formatCurrency(totalCostWithoutEscudo)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-escudo-dark font-bold">
                    Horas de treinamento ao ano <span className="text-escudo-pink">com</span> a Escudo
                  </Label>
                  <div className="h-10 bg-green-50 rounded-md flex items-center justify-center font-bold text-green-700 border-2 border-green-200">
                    {hoursWithoutEscudo / 2}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Valor total com Escudo</Label>
                  <div className="h-12 bg-green-50 rounded-md flex items-center justify-center font-bold text-green-700 border-2 border-green-200">
                    {formatCurrency(totalCostWithEscudo)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer with Savings */}
      <div className="bg-escudo-dark rounded-2xl mx-auto shadow-2xl p-12 text-center animate-fade-in"
           style={{ width: '1140px', maxWidth: 'calc(100% - 60px)', marginTop: '-15px' }}>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="text-white text-5xl font-black">Economia:</span>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-green-400 animate-pulse-glow">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-green-400" />
              <span className="text-green-400 text-4xl font-bold">
                {formatCurrency(savings)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-white/80">
            <BookOpen className="h-5 w-5" />
            <span className="text-lg">Escudo - Treinamentos SST EaD</span>
          </div>
        </div>
      </div>

      <div className="pb-12"></div>
    </div>
  );
};

export default Index;
