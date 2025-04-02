import React from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

const ThemePreference: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  
  // Get the current preference from localStorage
  const currentPreference = localStorage.getItem('themePreference') || 'system';
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Save the preference
    localStorage.setItem('themePreference', value);
    
    if (value === 'system') {
      // Clear the manual theme setting
      localStorage.removeItem('themeMode');
      
      // Apply system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if ((prefersDark && mode === 'light') || (!prefersDark && mode === 'dark')) {
        toggleColorMode();
      }
    } else {
      // Apply the selected theme
      if ((value === 'dark' && mode === 'light') || (value === 'light' && mode === 'dark')) {
        toggleColorMode();
      }
      
      // Save the explicit mode
      localStorage.setItem('themeMode', value);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Theme Preference
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="theme preference"
          name="theme-preference"
          value={currentPreference}
          onChange={handleChange}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="system" control={<Radio />} label="Use system preference" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ThemePreference;