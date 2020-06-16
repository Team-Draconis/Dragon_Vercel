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
      main: "#e00700",

      // #e00700
      // #304ffe
    },
    secondary: {
      main: "#19857b",
      // #19857b
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "black",
    },
    text: {
      primary: "#ffffff",
      secondary: "#00000",
    },
  },
});

export default theme;
