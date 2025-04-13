import { createTheme } from '@mui/material/styles';

const primary = {
  main: "#FC291C",
  light: "#FC291C",
  dark: "#40140F",
  contrastText: "black",
};

const secondary = {
  main: "#F8DFDB",
  light: "#FFF6F4",
  dark: "#F94C80",
  contrastText: "black",
};

// const tertiary = {
//   main: "#E5FC1C",
//   light: "#EDFF85",
//   dark: "#A0C300",
//   contrastText: "black",
// };

// const bold = {
//   main: "#ff0b48",
//   light: "#FF0BB2",
//   dark: "#FF0BB2",
//   contrastText: "black",
// };

const success = {
  main: "#7bba1c",
  light: "#EDFF85",
  dark: "#A0C300",
  contrastText: "black",
};

const warning = {
  main: "#FFCB10",
  light: "#FFCB10",
  dark: "#FFCB10",
  contrastText: "black",
};

const error = {
  main: "#F74F06",
  light: "#F74F06",
  dark: "#F74F06",
  contrastText: "black",
};

const info = {
  main: "#1100FF",
  light: "#1100FF",
  dark: "#1100FF",
  contrastText: "black",
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary,
    secondary,
    success,
    warning,
    error,
    info,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'black',
        },
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
        },
        body1: {
          fontSize: '1rem',
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      ...primary,
      main: primary.light,
    },
    secondary: {
      ...secondary,
      main: secondary.light,
    },
    success,
    warning,
    error,
    info,
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
        },
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
        },
        body1: {
          fontSize: '1rem',
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          backgroundColor: '#121212 !important',
          margin: 0,
          padding: 0,
        },
      },
    },
  },
}); 