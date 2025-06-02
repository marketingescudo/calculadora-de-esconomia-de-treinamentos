
import React from 'react';
import { Calculator, TrendingDown, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StepWrapper } from './StepWrapper';

export function Step1Introduction() {
  const features = [
    {
      icon: Calculator,
      title: 'Cálculo Preciso',
      description: 'Algoritmo baseado em dados reais do mercado de SST',
      badge: 'IA'
    },
    {
      icon: TrendingDown,
      title: 'Economia Real',
      description: 'Demonstre o ROI dos treinamentos EaD vs presenciais',
      badge: 'ROI'
    },
    {
      icon: Clock,
      title: 'Tempo Otimizado',
      description: 'Reduza pela metade o tempo de treinamento',
      badge: '50%'
    },
    {
      icon: Users,
      title: 'Impacto na Equipe',
      description: 'Calcule o custo real por colaborador',
      badge: 'Time'
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
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 bg-gradient-to-br from-escudo-pink/20 to-escudo-pink/10 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Calculator className="h-12 w-12 text-escudo-pink" />
            <div className="absolute -top-2 -right-2">
              <Badge variant="success" className="text-xs">
                Beta
              </Badge>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-escudo-dark mb-3 bg-gradient-to-r from-escudo-dark to-escudo-pink bg-clip-text text-transparent">
              Transforme seus treinamentos em economia
            </h2>
            <p className="text-lg text-escudo-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nossa calculadora considera todos os fatores: custo do instrutor, salário dos colaboradores, 
              impostos, custo de oportunidade e horas de treinamento para mostrar sua economia real.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-escudo-gray-200 hover:border-escudo-pink/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-escudo-pink/10 to-escudo-pink/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-escudo-pink" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-escudo-dark group-hover:text-escudo-pink transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-escudo-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-escudo-pink/5 to-escudo-pink/10 border-escudo-pink/20">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-escudo-pink/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-escudo-pink" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-escudo-dark mb-2">
                  Pronto para começar?
                </h3>
                <p className="text-escudo-gray-600 mb-4">
                  O processo é simples e leva apenas alguns minutos para completar.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Clock className="h-3 w-3 mr-1" />
                  3-5 minutos
                </Badge>
                <Badge variant="success" className="text-sm px-3 py-1">
                  Gratuito
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
