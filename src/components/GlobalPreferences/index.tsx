import { ChevronRight } from "@mui/icons-material";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { LightMode, DarkMode, SettingsBrightness } from "@mui/icons-material";
import { Language } from "@mui/icons-material";
import { useThemeContext } from "../../context/ThemeContext";

interface Theme {
  id: string;
  label: string;
}

const themes: Theme[] = [
  { id: "auto", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

interface GlobalPreferencesProps {
  selectedLanguage: string;
  selectedTheme: string;
  onLanguageClick: () => void;
  onThemeChange: (theme: string) => void;
}

// Update the ThemeSelector to accommodate three options
const ThemeSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  background: theme.palette.background.paper,
  borderRadius: '20px',
  padding: '2px',
  height: '32px',
  
  '& .slider': {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: 'calc(34.333% - 4px)', // Now 1/3 width for three options
    height: 'calc(100% - 4px)',
    background: theme.palette.ink.i300,
    borderRadius: '18px',
    transition: 'transform 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 0,
    transform: 'translateX(0)',
    
    '&.dark': {
      transform: 'translateX(100%)',
    },
    
    '&.auto': {
      transform: 'translateX(200%)',
    }
  },
  
  '& .theme-option': {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1,
    position: 'relative',
    color: theme.palette.text.secondary,
    padding: '0 6px',
    fontSize: '0.85rem',
    '&.active': {
      color: theme.palette.text.primary,
    }
  }
}));

export const GlobalPreferences: React.FC<GlobalPreferencesProps> = ({
  selectedLanguage,
  selectedTheme,
  onLanguageClick,
  onThemeChange,
}) => {
  const { mode, toggleColorMode } = useThemeContext();

  const getLanguageName = (code: string) => {
    const languageMap: Record<string, string> = {
      "en": "English",
    };
    return languageMap[code] || code;
  };

  return (
    <Paper 
      style={{
        borderRadius: "8px", 
        overflow: "hidden",
        padding: "16px"
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
        Global preferences
      </Typography>
      
      <Stack spacing={3}>
        {/* Theme Selector */}
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Theme
          </Typography>
          <ThemeSelector>
            <div className={`slider ${selectedTheme}`}></div>
            <div 
              className={`theme-option ${selectedTheme === 'light' ? 'active' : ''}`}
              onClick={() => toggleColorMode()}
            >
              <LightMode fontSize="small" sx={{ mr: 0.5 }} />
              Light
            </div>
            <div 
              className={`theme-option ${selectedTheme === 'dark' ? 'active' : ''}`}
              onClick={() => toggleColorMode()}
            >
              <DarkMode fontSize="small" sx={{ mr: 0.5 }} />
              Dark
            </div>
            <div 
              className={`theme-option ${selectedTheme === 'auto' ? 'active' : ''}`}
              onClick={() => toggleColorMode()}
            >
              <SettingsBrightness fontSize="small" sx={{ mr: 0.5 }} />
              Auto
            </div>
          </ThemeSelector>
        </Box>
        
        {/* Language Selector */}
        <Button
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
            textAlign: 'left',
            textTransform: 'none'
          }}
          onClick={onLanguageClick}
        >
          <Typography sx={{ color: 'text.secondary' }}>Language</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>{getLanguageName(selectedLanguage)}</Typography>
            <ChevronRight sx={{ color: 'text.disabled' }} />
          </Box>
        </Button>
      </Stack>
    </Paper>
  );
};
