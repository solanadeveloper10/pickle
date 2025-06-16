import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import Banner from "./components/Banner";
import Links from "./components/Links";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Banner />
    <Links />
    <Box height="200vh"></Box>
  </ThemeProvider>
);

export default App;
