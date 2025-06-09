import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6b8e23',
      light: '#8fbc8f',
      dark: '#556b2f',
    },
    secondary: {
      main: '#8fbc8f',
      light: '#98fb98',
      dark: '#6b8e23',
    },
    background: {
      default: '#0f172a', // Dark slate background
      paper: 'rgba(30, 41, 59, 0.8)', // Dark slate cards
    },
    success: {
      main: '#10b981', // Emerald
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    error: {
      main: '#ef4444', // Red
    },
    text: {
      primary: '#f8fafc', // Light text
      secondary: '#94a3b8', // Gray text
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(30, 41, 59, 0.8)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});
 
export const maintheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2E5B57',
    },
    secondary: {
      main: '#FF6B35',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2E5B57',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
});