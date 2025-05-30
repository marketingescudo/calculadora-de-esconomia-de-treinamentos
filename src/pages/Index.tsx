
import React from 'react';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { Sidebar } from '@/components/Sidebar';
import { StepRouter } from '@/components/StepRouter';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-escudo-gray-50 font-dm-sans flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          <StepRouter />
        </div>
      </div>
      <Toaster />
    </CalculatorProvider>
  );
};

export default Index;
