
import React from 'react';
import { StepWrapper } from './StepWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { EscudoLogo } from '../EscudoLogo';

export function Step2Introduction() {
  return (
    <StepWrapper
      title="Bem-vindo à Calculadora de Economia"
      description="Descubra quanto sua empresa pode economizar com treinamentos SST EaD"
      showBack={true}
    >
      <div className="space-y-6">
        {/* Logo principal */}
        <div className="text-center">
          <EscudoLogo size="lg" className="mx-auto mb-4" />
        </div>

        {/* Cards de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-escudo-pink/20 hover:border-escudo-pink/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-escudo-pink/10 rounded-lg flex items-center justify-center mb-3">
                <TrendingDown className="h-6 w-6 text-escudo-pink" />
              </div>
              <CardTitle className="text-lg text-escudo-dark">Reduza Custos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Economize até 50% em custos de treinamento com nossa plataforma EaD
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-escudo-pink/20 hover:border-escudo-pink/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-escudo-pink/10 rounded-lg flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-escudo-pink" />
              </div>
              <CardTitle className="text-lg text-escudo-dark">Otimize Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Reduza significativamente o tempo gasto com treinamentos presenciais
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-escudo-pink/20 hover:border-escudo-pink/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-escudo-pink/10 rounded-lg flex items-center justify-center mb-3">
                <Calculator className="h-6 w-6 text-escudo-pink" />
              </div>
              <CardTitle className="text-lg text-escudo-dark">Cálculo Preciso</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Nossa calculadora considera todos os custos envolvidos para um resultado real
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-escudo-pink/20 hover:border-escudo-pink/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-escudo-pink/10 rounded-lg flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 text-escudo-pink" />
              </div>
              <CardTitle className="text-lg text-escudo-dark">ROI Comprovado</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Visualize o retorno do investimento com dados concretos e confiáveis
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Informações adicionais */}
        <Card className="bg-escudo-gray-50 border-escudo-gray-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-escudo-dark mb-2">Como funciona?</h3>
              <p className="text-sm text-escudo-gray-600 leading-relaxed">
                Nossa calculadora compara os custos dos treinamentos presenciais tradicionais 
                com a solução EaD da Escudo, considerando fatores como custo de instrutores, 
                horas de trabalho dos colaboradores e custos de oportunidade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
