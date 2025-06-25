import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import Banner from "./components/Banner";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Banner />
    </ThemeProvider>
  );
};

export default App;
