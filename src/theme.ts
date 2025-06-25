import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fac8f2",
      light: "#ffb6d5",
    },
    secondary: {
      main: "#ffb6c1",
    },
    background: {
      default: "#fff",
      paper: "#faf6ef",
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
    divider: "#e0ddd4",
  },
  typography: {
    fontFamily: "'Schoolbell', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2.5rem", fontWeight: 600 },
    h3: { fontSize: "2rem", fontWeight: 500 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "1rem", fontWeight: "bold" },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#000",
          fontSize: "3rem",
          fontWeight: 700,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1540,
      xl: 1636,
    },
  },
});
