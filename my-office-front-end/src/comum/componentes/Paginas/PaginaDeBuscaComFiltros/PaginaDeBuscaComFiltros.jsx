import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  TextField,
  Autocomplete,
  Divider,
  useMediaQuery,
} from '@mui/material';
import CardSala from '../../CardSala/CardSala';
import SkeletonCardSala from '../../CardSala/SkeletonCardSala';
import AppBarLogado from '../PaginaLogado/AppBarLogado';

const normalizarTexto = (texto) =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function PaginaDeBuscaComFiltros() {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [filtros, setFiltros] = useState({
    comercial: false,
    corporativo: false,
    educacional: false,
    residencial: false,
  });

  const [valorMinimo, setValorMinimo] = useState('');
  const [valorMaximo, setValorMaximo] = useState('');

  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtrando, setFiltrando] = useState(false);
  const [salasFiltradas, setSalasFiltradas] = useState([]);
  const [buscaLocal, setBuscaLocal] = useState('');
  const [opcoesAutoComplete, setOpcoesAutoComplete] = useState([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('https://my-office-web.onrender.com/salas');
        const data = await response.json();
        setSalas(data);
        setOpcoesAutoComplete([
          ...new Set(
            data.flatMap((sala) => [
              sala.rua,
              sala.bairro,
              sala.cidade,
              sala.estado,
            ])
          ),
        ]);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  const aplicarFiltros = () => {
    if (!salas || salas.length === 0) {
      setSalasFiltradas([]);
      return;
    }

    setFiltrando(true);

    const timeout = setTimeout(() => {
      const tiposSelecionados = Object.keys(filtros).filter((tipo) => filtros[tipo]);

      const resultado = salas.filter((sala) => {
        const tipoSala = normalizarTexto(sala.tipo);
        const preco = parseFloat(sala.preco);
        const min = valorMinimo ? parseFloat(valorMinimo) : 0;
        const max = valorMaximo ? parseFloat(valorMaximo) : Infinity;

        const tipoValido =
          tiposSelecionados.length === 0 ||
          tiposSelecionados.some((tipo) => tipoSala.includes(tipo));

        const precoValido = preco >= min && preco <= max;

        const localValido = buscaLocal.trim() === '' ||
          normalizarTexto(sala.rua).includes(normalizarTexto(buscaLocal)) ||
          normalizarTexto(sala.bairro).includes(normalizarTexto(buscaLocal)) ||
          normalizarTexto(sala.cidade).includes(normalizarTexto(buscaLocal)) ||
          normalizarTexto(sala.estado).includes(normalizarTexto(buscaLocal));

        return tipoValido && precoValido && localValido;
      });

      setSalasFiltradas(resultado);
      setFiltrando(false);
    }, 500);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, salas, valorMinimo, valorMaximo, buscaLocal]);

  const handleFiltroChange = (event) => {
    setFiltros({ ...filtros, [event.target.name]: event.target.checked });
  };

  return <>
    <AppBarLogado />
    <Box sx={{ display: 'flex', p: 2, flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
      <Paper
        elevation={3}
        sx={{
          minWidth: 250,
          maxWidth: 300,
          p: 3,
          borderRadius: 3,
          height: 'fit-content',
          position: isMobile ? 'static' : 'sticky',
          top: 20,
        }}
      >
        <Typography variant="h6" gutterBottom>Filtros</Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2">Tipo de imóvel</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={filtros.comercial} onChange={handleFiltroChange} name="comercial" />} label="Comercial" />
          <FormControlLabel control={<Checkbox checked={filtros.corporativo} onChange={handleFiltroChange} name="corporativo" />} label="Corporativo" />
          <FormControlLabel control={<Checkbox checked={filtros.educacional} onChange={handleFiltroChange} name="educacional" />} label="Educacional" />
          <FormControlLabel control={<Checkbox checked={filtros.residencial} onChange={handleFiltroChange} name="residencial" />} label="Residencial" />
        </FormGroup>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" gutterBottom>Valor mínimo</Typography>
        <TextField size="small" fullWidth placeholder="R$ 0" variant="outlined" value={valorMinimo} onChange={(e) => setValorMinimo(e.target.value)} />

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Valor máximo</Typography>
        <TextField size="small" fullWidth placeholder="R$ 0" variant="outlined" value={valorMaximo} onChange={(e) => setValorMaximo(e.target.value)} />
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Autocomplete
          freeSolo
          options={buscaLocal.trim() === '' ? [] : opcoesAutoComplete}
          inputValue={buscaLocal}
          onInputChange={(event, newInputValue) => setBuscaLocal(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Digite rua, bairro, cidade ou estado"
              fullWidth
              sx={{ mb: 3 }}
            />
          )}
        />

        <Typography variant="h5" mb={2}>Resultados encontrados</Typography>

        {loading || filtrando ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkeletonCardSala />
              </Grid>
            ))}
          </Grid>
        ) : salasFiltradas.length === 0 ? (
          <Typography variant="h6" align="center">Nenhuma sala encontrada com os filtros informados.</Typography>
        ) : (
          <Grid container spacing={3}>
            {salasFiltradas.map((sala) => (
              <Grid key={sala.id} item xs={12} sm={6} md={4}>
                <CardSala
                  usuarioId="1"
                  salaId={sala.id}
                  titulo={`Sala ${sala.tipo}`}
                  endereco={`${sala.rua}, ${sala.numero} - ${sala.bairro}, ${sala.cidade} - ${sala.estado}`}
                  preco={sala.preco}
                  capacidade={sala.capacidade}
                  descricao={sala.descricao}
                  imagemBase64={sala.imagem}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  </>;
}
