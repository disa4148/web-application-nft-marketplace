'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { Provider } from 'react-redux';
import { store } from '@/shared/redux/store';
import { Toaster } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { setPromo } from './cookie';

const RefProvider = () => {
  const ref = useSearchParams();

  React.useEffect(() => {
    if (ref.toString()) {
      setPromo(ref.toString().substring(4));
    }
  }, []);
  return null;
};

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <RefProvider />
      <Provider store={store}>{children}</Provider>
    </NextThemesProvider>
  );
}
