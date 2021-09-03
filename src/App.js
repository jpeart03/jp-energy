import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Routes from "./components/Routes";
import { blue, yellow } from "@material-ui/core/colors";

const lightSourceTheme = createTheme({
  palette: {
    type: "dark",
    primary: yellow,
    secondary: blue,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={lightSourceTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
