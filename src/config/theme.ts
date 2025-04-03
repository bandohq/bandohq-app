import { createTheme, PaletteMode } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';

// Define color palette for both light and dark modes
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#40B494',
            light: '#E0FEF6',
            dark: '#393F44',
            contrastText: '#FFFFFF',
          },
          secondary: { main: '#59c6a8' },
          background: {
            default: '#FFFFFF',
            paper: '#F6F7F9',
          },
          ink: {
            i950: '#000000',
            i900: '#212121',
            i800: '#3A3E3D',
            i700: '#393F44',
            i600: '#3D3D3D',
            i500: '#686F73',
            i400: '#9A9A9A',
            i300: '#BFC3C7',
            i250: '#D9D9D9',
            i200: '#E6E7E9',
            i150: '#F6F7F9',
            i100: '#F2F2F2',
            i000: '#FFFFFF',
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#59c6a8',
            light: '#7DD8BF',
            dark: '#348F77',
            contrastText: '#FFFFFF',
          },
          secondary: { main: '#40B494' },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          ink: {
            i950: '#FFFFFF',
            i900: '#F2F2F2',
            i800: '#E6E7E9',
            i700: '#D9D9D9',
            i600: '#BFC3C7',
            i500: '#9A9A9A',
            i400: '#686F73',
            i300: '#3D3D3D',
            i250: '#393F44',
            i200: '#3A3E3D',
            i150: '#212121',
            i100: '#1A1A1A',
            i000: '#121212',
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1440,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      'Kanit',
      'TWK Everett',
      '-apple-system',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  transitions: {
    duration: {
      enteringScreen: 400,
      leavingScreen: 350,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s, color 0.3s',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s, box-shadow 0.3s',
        },
      },
    },
  },
});

// Create a function to generate the theme based on mode
export const createAppTheme = (mode: PaletteMode) => {
  let theme = createTheme(getDesignTokens(mode));
  return responsiveFontSizes(theme);
};

// Default theme (light mode)
const theme = createAppTheme('light');

export default theme;
