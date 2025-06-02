
import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';

export function ReportGenerator() {
  const { state } = useCalculator();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const generateHTMLReport = () => {
    const savingsPercentage = state.trainingHours.totalCostWithoutEscudo > 0 
      ? ((state.savings / state.trainingHours.totalCostWithoutEscudo) * 100).toFixed(1)
      : 0;

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Economia - Escudo Treinamentos</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background-color: #f8f9fa;
            color: #1a171b;
            line-height: 1.6;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #e30068;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #e30068;
            font-size: 2.5rem;
            margin: 0;
            font-weight: bold;
          }
          .header p {
            color: #80868b;
            font-size: 1.1rem;
            margin: 10px 0 0 0;
          }
          .savings-highlight {
            background: linear-gradient(135deg, #e30068 0%, #c5005a 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
          }
          .savings-amount {
            font-size: 3rem;
            font-weight: bold;
            margin: 10px 0;
          }
          .savings-percentage {
            font-size: 1.2rem;
            opacity: 0.9;
          }
          .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
          }
          .comparison-card {
            border: 2px solid #e8eaed;
            border-radius: 12px;
            padding: 25px;
          }
          .comparison-card.without {
            border-color: #ea4335;
            background-color: #fef7f0;
          }
          .comparison-card.with {
            border-color: #34a853;
            background-color: #f0f9f0;
          }
          .comparison-card h3 {
            margin: 0 0 20px 0;
            font-size: 1.3rem;
          }
          .comparison-card.without h3 {
            color: #ea4335;
          }
          .comparison-card.with h3 {
            color: #34a853;
          }
          .data-row {
            display: flex;
            justify-content: space-between;
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #f1f3f4;
          }
          .data-row:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 1.1rem;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #e8eaed;
          }
          .summary-section {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            text-align: center;
          }
          .summary-item h4 {
            color: #80868b;
            font-size: 0.9rem;
            margin: 0 0 8px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .summary-item p {
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0;
            color: #1a171b;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e8eaed;
            color: #80868b;
          }
          .date {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Relatório de Economia</h1>
            <p>Análise de Custos com Treinamentos SST EaD</p>
          </div>

          <div class="savings-highlight">
            <h2 style="margin: 0 0 10px 0; font-size: 1.5rem;">Sua Economia Anual</h2>
            <div class="savings-amount">${formatCurrency(state.savings)}</div>
            <div class="savings-percentage">Economia de ${savingsPercentage}% em custos de treinamento</div>
          </div>

          <div class="comparison-grid">
            <div class="comparison-card without">
              <h3>📊 Cenário Sem a Escudo</h3>
              <div class="data-row">
                <span>Custo do instrutor:</span>
                <span>${formatCurrency(state.instructor.total)}</span>
              </div>
              <div class="data-row">
                <span>Horas de treinamento:</span>
                <span>${state.trainingHours.withoutEscudo}h</span>
              </div>
              <div class="data-row">
                <span>Custo por hora:</span>
                <span>${formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <div class="data-row">
                <span>Total anual:</span>
                <span style="color: #ea4335;">${formatCurrency(state.trainingHours.totalCostWithoutEscudo)}</span>
              </div>
            </div>

            <div class="comparison-card with">
              <h3>✅ Cenário Com a Escudo</h3>
              <div class="data-row">
                <span>Redução de horas:</span>
                <span style="color: #34a853;">50%</span>
              </div>
              <div class="data-row">
                <span>Horas de treinamento:</span>
                <span>${state.trainingHours.withEscudo}h</span>
              </div>
              <div class="data-row">
                <span>Custo por hora:</span>
                <span>${formatCurrency(state.totalEmployeeCost)}</span>
              </div>
              <div class="data-row">
                <span>Total anual:</span>
                <span style="color: #34a853;">${formatCurrency(state.trainingHours.totalCostWithEscudo)}</span>
              </div>
            </div>
          </div>

          <div class="summary-section">
            <h3 style="text-align: center; margin-bottom: 25px; color: #1a171b;">Resumo dos Dados Utilizados</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <h4>Cotação USD/BRL</h4>
                <p>R$ ${state.dollarRate.toFixed(2)}</p>
              </div>
              <div class="summary-item">
                <h4>Salário do Colaborador</h4>
                <p>${formatCurrency(state.employee.salary)}</p>
              </div>
              <div class="summary-item">
                <h4>Custo do Instrutor</h4>
                <p>${formatCurrency(state.instructor.base)}</p>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="date">Relatório gerado em ${new Date().toLocaleDateString('pt-BR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const downloadReport = () => {
    const htmlContent = generateHTMLReport();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-economia-escudo-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { downloadReport };
}
