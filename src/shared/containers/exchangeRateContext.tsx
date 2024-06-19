'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ExchangeRateContextProps {
  ethToRubRate: number | null;
  ethToUsdRate: number | null;
  isLoadingRates: boolean;
  fetchExchangeRates: () => void;
}

const ExchangeRateContext = createContext<ExchangeRateContextProps | undefined>(undefined);

export const useExchangeRate = (): ExchangeRateContextProps => {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error('useExchangeRate must be used within an ExchangeRateProvider');
  }
  return context;
};

export const ExchangeRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethToRubRate, setEthToRubRate] = useState<number | null>(null);
  const [ethToUsdRate, setEthToUsdRate] = useState<number | null>(null); 
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);

  const fetchExchangeRates = useCallback(async () => {
    setIsLoadingRates(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=rub,usd',
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const rubRate = data['ethereum']['rub'];
      const usdRate = data['ethereum']['usd']; 
      setEthToRubRate(rubRate);
      setEthToUsdRate(usdRate);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  return (
    <ExchangeRateContext.Provider value={{ ethToRubRate, ethToUsdRate, isLoadingRates, fetchExchangeRates }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
