import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import ButtonAppBar from "../../Paginas/PaginaInicial/AppBar";
import FiltroImoveis from "../../Paginas/PaginaInicial/BarraDeBuscaSuperior";
import CustomCarousel from "../../../Componentes/Paginas/CarrousselInicial/CarrousselInicial";
import DarkMode from "../../DarkMode/DarkMode";
import Footer from "../Footer/Footer";

import React, { useState } from "react";
import { lightTheme, darkTheme } from "../../../Theme/theme";

const PaginaInicial = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (checked) => {
    setIsDark(checked);
  };

  return ( <>
    <DarkMode isDark={isDark} toggleTheme={toggleTheme} />
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />

      <ButtonAppBar />

      <Container sx={{ py: 4 }} maxWidth="">
        <FiltroImoveis />
      </Container>

      <Container sx={{ py: 4 }} maxWidth="">
        <CustomCarousel />
      </Container>

      <Container sx={{ py: 4 }} maxWidth="">
        <Footer />
      </Container>
    </ThemeProvider>
      </>
  );
};

export default PaginaInicial;
