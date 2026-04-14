import { createTheme } from '@mui/material/styles'

export function buildAppTheme({ dark, contrast, fontSize }) {
  const mode = dark ? 'dark' : 'light'
  const highContrast = !!contrast

  const palette = highContrast
    ? {
        mode,
        primary: { main: dark ? '#ffd54f' : '#0f172a' },
        secondary: { main: dark ? '#80deea' : '#1d4ed8' },
        background: {
          default: dark ? '#0a0a0a' : '#ffffff',
          paper: dark ? '#111111' : '#f8fafc'
        },
        text: {
          primary: dark ? '#ffffff' : '#111827',
          secondary: dark ? '#f3f4f6' : '#374151'
        }
      }
    : {
        mode,
        primary: { main: dark ? '#90caf9' : '#1d4ed8' },
        secondary: { main: dark ? '#f59e0b' : '#ea580c' },
        background: {
          default: dark ? '#0b1220' : '#f8fafc',
          paper: dark ? '#111827' : '#ffffff'
        }
      }

  return createTheme({
    palette,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif",
      fontSize: Number(fontSize) || 16,
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 }
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            minHeight: 42
          }
        }
      },
      MuiTextField: {
        defaultProps: { fullWidth: true, size: 'medium' }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid rgba(148,163,184,0.25)'
          }
        }
      }
    }
  })
}
