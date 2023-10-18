import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1361,
      lg: 1360,
      md: 768,
      sm: 560,
      xs: 360,
    },
  },
  palette: {
    primary: {
      // main: "#206A7E",
      main: "#00A881",
    },
  },
  typography: {
    h1: {
      fontFamily: "Roboto",
      fontSize: "96px",
    },
    h2: {
      fontFamily: "Roboto",
      fontSize: "64px",
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: "48px",
    },
    h4: {
      fontFamily: "Roboto",
      fontSize: "36px",
    },
    h5: {
      fontFamily: "Roboto",
      fontSize: "24px",
      color: "#6F6F6F",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: "18px",
      color: "#6F6F6F",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: "500",
      letterSpacing: "0.08px",
    },
    body2: {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: "500",
    },
    subtitle1: { fontFamily: "Inter", fontSize: "10px", fontWeight: "500" },
    subtitle2: undefined,
    overline: {
      fontWeight: 400,
      fontFamily: "Inter",
      fontSize: "12px",
      lineHeight: "24px",
      letterSpacing: "0.66px",
      textTransform: "uppercase",
      userSelect: "none",
    },
  },
});
