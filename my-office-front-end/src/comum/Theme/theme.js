import { createTheme } from '@mui/material/styles';

// Tipografia compartilhada
const commonTypography = {
  typography: {
    fontFamily: 'Ageo Bold, sans-serif',
  },
};

// Tema claro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
  ...commonTypography,
});

// Tema escuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
  ...commonTypography,
});

// Tema padrão (caso necessário)
const theme = createTheme({
  ...commonTypography,
});

export default theme;
