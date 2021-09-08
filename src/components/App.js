import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import { AuthProvider } from "../contexts/AuthContext";
import Routes from "./Routes";

const lightSourceTheme = createTheme({
    palette: {
        type: "dark",
        primary: yellow,
        secondary: blue,
    },
});

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={lightSourceTheme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
