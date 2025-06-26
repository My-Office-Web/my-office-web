import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
  Divider,
  useMediaQuery,
  Button,
  Drawer,
  IconButton,
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";

import AppBarLogado from "../PaginaLogado/AppBarLogado";
import CardSala from "../../CardSala/CardSala";
import SkeletonCardSala from "../../CardSala/SkeletonCardSala";
import Footer from "../Footer/Footer";
import CustomCarousel from "../CarrousselInicial/CarrousselInicial";
import DarkMode from "../../DarkMode/DarkMode";
import { lightTheme, darkTheme } from "../../../Theme/theme";
import AgeoBold from "../../../../assets/fonts/Ageo-Bold.otf";

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

const normalizarTexto = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function PaginaDeBuscaComFiltros() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = (checked) => setIsDark(checked);

  const [filtros, setFiltros] = useState({
    comercial: false,
    corporativo: false,
    educacional: false,
    residencial: false,
  });

  const [valorMinimo, setValorMinimo] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [salas, setSalas] = useState([]);
  const [salasFiltradas, setSalasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtrando, setFiltrando] = useState(false);
  const [buscaLocal, setBuscaLocal] = useState("");
  const [opcoesAutoComplete, setOpcoesAutoComplete] = useState([]);
  const [drawerFiltroAberto, setDrawerFiltroAberto] = useState(false);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch(
          "https://my-office-web.onrender.com/salas"
        );
        const data = await response.json();
        setSalas(data);

        const locais = new Set();
        data.forEach((sala) => {
          [sala.rua, sala.bairro, sala.cidade, sala.estado].forEach((loc) => {
            if (loc) locais.add(loc);
          });
        });
        setOpcoesAutoComplete([...locais]);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);

  useEffect(() => {
    if (!salas.length) return;

    setFiltrando(true);
    const delay = setTimeout(() => {
      const tiposSelecionados = Object.keys(filtros).filter(
        (tipo) => filtros[tipo]
      );

      const resultado = salas.filter((sala) => {
        const preco = parseFloat(sala.preco);
        const tipoSala = normalizarTexto(sala.tipo);
        const min = valorMinimo ? parseFloat(valorMinimo) : 0;
        const max = valorMaximo ? parseFloat(valorMaximo) : Infinity;

        const tipoValido =
          tiposSelecionados.length === 0 ||
          tiposSelecionados.some((tipo) => tipoSala.includes(tipo));

        const precoValido = preco >= min && preco <= max;

        const localValido =
          buscaLocal.trim() === "" ||
          [sala.rua, sala.bairro, sala.cidade, sala.estado]
            .map(normalizarTexto)
            .some((loc) => loc.includes(normalizarTexto(buscaLocal)));

        return tipoValido && precoValido && localValido;
      });

      setSalasFiltradas(resultado);
      setFiltrando(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [filtros, valorMinimo, valorMaximo, buscaLocal, salas]);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <DarkMode isDark={isDark} toggleTheme={toggleTheme} />
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <FonteGlobal />

        <AppBarLogado />

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton
              color="primary"
              onClick={() => setDrawerFiltroAberto(true)}
              sx={{ ml: 1 }}
            >
              <FaFilter />
            </IconButton>
            <Autocomplete
              freeSolo
              options={buscaLocal.trim() === "" ? [] : opcoesAutoComplete}
              inputValue={buscaLocal}
              onInputChange={(e, val) => setBuscaLocal(val)}
              sx={{ flexGrow: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Digite rua, bairro, cidade ou estado"
                  fullWidth
                  size="small"
                />
              )}
            />
          </Box>

          {(loading || filtrando) && (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ maxWidth: "1600px", mx: "auto" }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={i}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <SkeletonCardSala />
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && !filtrando && salasFiltradas.length === 0 && (
            <Typography align="center" variant="h6">
              Nenhuma sala encontrada.
            </Typography>
          )}

          {!loading && !filtrando && salasFiltradas.length > 0 && (
            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{ maxWidth: "1600px", mx: "auto" }}
            >
              {salasFiltradas.map((sala) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={sala.id}>
                  <CardSala
                    titulo={`Sala em ${sala.bairro}`}
                    endereco={`${sala.cidade} / ${sala.estado}`}
                    preco={sala.preco}
                    capacidade={sala.capacidade}
                    descricao={sala.descricao}
                    imagemBase64={sala.imagem}
                    salaId={sala.id_sala}
                    usuarioId={sala.usuario_id}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          <Container sx={{ py: 6 }} maxWidth="">
            <CustomCarousel />
          </Container>
          <Container maxWidth={false} disableGutters sx={{ py: 0 }}>
            <Footer />
          </Container>
        </Box>

        <Drawer
          anchor="left"
          open={drawerFiltroAberto}
          onClose={() => setDrawerFiltroAberto(false)}
          PaperProps={{ sx: { width: isMobile ? "80vw" : 300, p: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">Tipo</Typography>
          <FormGroup>
            {Object.keys(filtros).map((tipo) => (
              <FormControlLabel
                key={tipo}
                control={
                  <Checkbox
                    name={tipo}
                    checked={filtros[tipo]}
                    onChange={handleFiltroChange}
                  />
                }
                label={tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              />
            ))}
          </FormGroup>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2">Valor mínimo</Typography>
          <TextField
            size="small"
            fullWidth
            type="number"
            value={valorMinimo}
            onChange={(e) => setValorMinimo(e.target.value)}
          />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Valor máximo
          </Typography>
          <TextField
            size="small"
            fullWidth
            type="number"
            value={valorMaximo}
            onChange={(e) => setValorMaximo(e.target.value)}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setDrawerFiltroAberto(false)}
            >
              Aplicar e Fechar
            </Button>
          </Box>
        </Drawer>
      </ThemeProvider>
    </>
  );
}
