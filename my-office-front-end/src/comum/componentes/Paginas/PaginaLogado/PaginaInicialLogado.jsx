import React, { useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import FiltroImoveis from "../PaginaInicial/BarraDeBuscaSuperior";
import CustomCarousel from "../CarrousselInicial/CarrousselInicial";
import DarkMode from "../../DarkMode/DarkMode";
import Footer from "../Footer/Footer";

import { lightTheme, darkTheme } from "../../../Theme/theme";
import AppBarLogado from "./AppBarLogado";
import SalasLista from "../../CardSala/SalasLista";
import AgeoBold from "../../../../assets/fonts/Ageo-Bold.otf";
import LandingPage from "../LandingPage/LandingPage";

const FonteGlobal = () => (
  <GlobalStyles
    styles={{
      "@font-face": {
        fontFamily: "'Ageo Bold', Arial, sans-serif",
        src: `url(${AgeoBold}) format('opentype')`,

        fontStyle: "normal",
      },
    }}
  />
);

const PaginaInicialLogado = () => {
  const [isDark, setIsDark] = useState(false);

  // Filtro controlado
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("Todas as salas");
  const [filtros, setFiltros] = useState({ local: "", tipo: "Todas as salas" });

  const toggleTheme = (checked) => {
    setIsDark(checked);
  };

  const onBuscar = () => {
    setFiltros({ local, tipo });
  };

  return (
    <>
      <DarkMode isDark={isDark} toggleTheme={toggleTheme} />
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <FonteGlobal />

        <AppBarLogado /> 

        <Container sx={{ py: 4 }} maxWidth="">
          <FiltroImoveis
            local={local}
            tipo={tipo}
            setLocal={setLocal}
            setTipo={setTipo}
            onBuscar={onBuscar}
          />
        </Container>

        <Container sx={{ py: 1 }} maxWidth={false}>
          <SalasLista filtros={filtros} />
        </Container>

        <Container sx={{ py: 4 }} maxWidth="">
          <CustomCarousel />
        </Container>
        <Container sx={{ py: 4 }} maxWidth="">
          <LandingPage />
        </Container>
        <Container maxWidth={false} disableGutters sx={{ py: 0 }}>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default PaginaInicialLogado;
