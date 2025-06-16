import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import "./app.scss";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {loading && (
          <div className='loader-container'>
            <div className='loader-2'></div>
          </div>
        )}

        <Banner />
      </>
    </ThemeProvider>
  );
};

export default App;
