import React, { useEffect, useState } from "react";
import { Container, ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";

import ButtonAppBar from "../../Paginas/PaginaInicial/AppBar";
import FiltroImoveis from "../../Paginas/PaginaInicial/BarraDeBuscaSuperior";
import CustomCarousel from "../../../Componentes/Paginas/CarrousselInicial/CarrousselInicial";
import DarkMode from "../../DarkMode/DarkMode";
import Footer from "../Footer/Footer";

import { lightTheme, darkTheme } from "../../../Theme/theme";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";
import AppBarLogado from "../PaginaLogado/AppBarLogado";
import SalasLista from "../../CardSala/SalasLista";
import AgeoBold from '../../../../assets/fonts/Ageo-Bold.otf';


const instanciaAutenticacao = new ServicoAutenticacao();

const FonteGlobal = () => (
  <GlobalStyles
    styles={{
      '@font-face': {
        fontFamily: "'Ageo Bold', Arial, sans-serif",
        src: `url(${AgeoBold}) format('opentype')`,

        fontStyle: 'normal',
      },
    }}
  />
);


const PaginaInicial = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Filtro controlado
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('Todas as salas');
  const [filtros, setFiltros] = useState({ local: '', tipo: 'Todas as salas' });

  const toggleTheme = (checked) => {
    setIsDark(checked);
  };

  useEffect(() => {
    const usuarioLogado = instanciaAutenticacao.usuarioEstaLogado();
    setUsuarioAutenticado(usuarioLogado);
  }, []);

  const onBuscar = () => {
    setFiltros({ local, tipo });
  };

  return (
    <>
      <DarkMode isDark={isDark} toggleTheme={toggleTheme} />
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <FonteGlobal />

        {usuarioAutenticado ? <AppBarLogado /> : <ButtonAppBar />}

        <Container sx={{ py: 4 }} maxWidth="">
          <FiltroImoveis
            local={local}
            tipo={tipo}
            setLocal={setLocal}
            setTipo={setTipo}
            onBuscar={onBuscar}
          />
        </Container>

        <Container sx={{ py: 4 }} maxWidth={false}>
          <SalasLista filtros={filtros} />
        </Container>

        <Container sx={{ py: 4 }} maxWidth="">
          <CustomCarousel />
        </Container>

        <Container maxWidth={false} disableGutters sx={{ py: 0 }}>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default PaginaInicial;
