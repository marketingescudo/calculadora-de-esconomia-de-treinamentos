
import React, { useState, useEffect } from 'react';
import { StepWrapper } from './StepWrapper';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building2 } from 'lucide-react';

export function Step1ParticipantData() {
  const { state, dispatch } = useCalculator();
  const [name, setName] = useState(state.participant.name);
  const [company, setCompany] = useState(state.participant.company);

  useEffect(() => {
    dispatch({
      type: 'SET_PARTICIPANT_DATA',
      payload: { name, company }
    });
  }, [name, company, dispatch]);

  const canProceed = name.trim().length > 0 && company.trim().length > 0;

  return (
    <StepWrapper
      title="Dados do Participante"
      description="Para personalizar seu relatório, precisamos de algumas informações"
      showBack={false}
      canProceed={canProceed}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-escudo-dark">
              <User className="h-5 w-5 text-escudo-pink" />
              Identificação
            </CardTitle>
            <CardDescription>
              Essas informações aparecerão no seu relatório personalizado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="participantName" className="text-sm font-medium text-escudo-gray-700">
                Nome do participante *
              </Label>
              <Input
                id="participantName"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-escudo-gray-700 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Nome da empresa *
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Digite o nome da sua empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full"
              />
            </div>

            {!canProceed && (
              <p className="text-sm text-escudo-gray-500 italic">
                * Preencha todos os campos para continuar
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </StepWrapper>
  );
}
