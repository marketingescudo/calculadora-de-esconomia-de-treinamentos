
import React from 'react';
import { Calculator, TrendingDown, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StepWrapper } from './StepWrapper';

export function Step1Introduction() {
  const features = [
    {
      icon: Calculator,
      title: 'Cálculo Preciso',
      description: 'Algoritmo baseado em dados reais do mercado de SST'
    },
    {
      icon: TrendingDown,
      title: 'Economia Real',
      description: 'Demonstre o ROI dos treinamentos EaD vs presenciais'
    },
    {
      icon: Clock,
      title: 'Tempo Otimizado',
      description: 'Reduza pela metade o tempo de treinamento'
    },
    {
      icon: Users,
      title: 'Impacto na Equipe',
      description: 'Calcule o custo real por colaborador'
    }
  ];

  return (
    <StepWrapper
      title="Bem-vindo à Calculadora Escudo"
      description="Descubra quanto sua empresa pode economizar com treinamentos SST EaD"
      showBack={false}
    >
      <div className="space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-escudo-pink/10 rounded-full flex items-center justify-center mx-auto">
            <Calculator className="h-10 w-10 text-escudo-pink" />
          </div>
          <h2 className="text-2xl font-semibold text-escudo-dark">
            Transforme seus treinamentos em economia
          </h2>
          <p className="text-lg text-escudo-gray-600 max-w-2xl mx-auto">
            Nossa calculadora considera todos os fatores: custo do instrutor, salário dos colaboradores, 
            impostos, custo de oportunidade e horas de treinamento para mostrar sua economia real.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-escudo-gray-200 hover:border-escudo-pink/30 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-escudo-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-escudo-pink" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-escudo-dark mb-2">{feature.title}</h3>
                    <p className="text-escudo-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section - mudança de background */}
        <div className="bg-escudo-pink/10 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-escudo-dark mb-2">
            Pronto para começar?
          </h3>
          <p className="text-escudo-gray-600 mb-4">
            O processo é simples e leva apenas alguns minutos para completar.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-escudo-gray-500">
            <Clock className="h-4 w-4" />
            <span>Tempo estimado: 3-5 minutos</span>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}
