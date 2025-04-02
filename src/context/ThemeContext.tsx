import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, PaletteMode } from '@mui/material';
import { createAppTheme } from '../config/theme';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  setThemePreference: (preference: 'light' | 'dark' | 'system') => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  setThemePreference: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user has a saved preference or use system preference
  const getInitialMode = (): PaletteMode => {
    const preference = localStorage.getItem('themePreference');
    
    // If preference is explicitly set to light or dark, use that
    if (preference === 'light') return 'light';
    if (preference === 'dark') return 'dark';
    
    // If there's a saved mode and preference isn't 'system', use the saved mode
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode && preference !== 'system') return savedMode;
    
    // Otherwise, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  // Update localStorage when mode changes
  useEffect(() => {
    const preference = localStorage.getItem('themePreference');
    if (preference !== 'system') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    const preference = localStorage.getItem('themePreference');
    if (preference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setMode(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const setThemePreference = (preference: 'light' | 'dark' | 'system') => {
    localStorage.setItem('themePreference', preference);
    
    if (preference === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    } else {
      setMode(preference);
    }
  };

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        // If we're manually toggling, set preference to the specific mode
        localStorage.setItem('themePreference', newMode);
      },
      setThemePreference,
    }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 