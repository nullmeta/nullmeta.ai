'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hasSystemPreference = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [isDarkMode, setIsDarkMode] = useState(hasSystemPreference ?? true);

  useEffect(() => {
    setIsDarkMode(hasSystemPreference ?? true);
  }, [hasSystemPreference]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 