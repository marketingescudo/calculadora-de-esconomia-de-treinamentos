
import React from 'react';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { Sidebar } from '@/components/Sidebar';
import { StepRouter } from '@/components/StepRouter';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-escudo-gray-50 font-dm-sans flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto ml-0 lg:ml-80">
          <div className="p-4 lg:p-8">
            <StepRouter />
          </div>
        </div>
      </div>
      <Toaster />
    </CalculatorProvider>
  );
};

export default Index;
