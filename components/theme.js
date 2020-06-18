import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Lemonada",
      "LilitaOne-Regular",
      "Josefin Sans",
      "Helvetica Neue",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#FFC045",

      // #FFC107
      // #e00700
      // #304ffe
      // #FFC107
    },
    secondary: {
      main: "#3a4750",
      // #546e7a
      // #00796b teal
      // #546e7a blue grey
      // #19857b
      // #616161
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#00000",
    },
  },
});

export default theme;
