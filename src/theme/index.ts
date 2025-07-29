import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "hsla(167, 65%, 28%, 1.00)",
    },
    secondary: {
      main: "hsla(36, 100%, 50%, 1.00)",
    },
    text: {
      primary: "hsla(0, 0%, 7%, 1.00)",
      secondary: "hsla(210, 79%, 46%, 1.00)",
    },
  },
});

export default theme;
