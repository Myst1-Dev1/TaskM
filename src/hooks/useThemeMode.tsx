import React, { createContext, useContext, useState, useMemo } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: ThemeMode;
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => {
    const theme = mode === 'dark' ? darkTheme : lightTheme;
    return { theme, mode, toggleTheme };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
}