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

// Função para normalizar texto para comparação (remove acentos e coloca em minúsculo)
const normalizarTexto = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

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
  const [salasFiltradas, setSalasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtrando, setFiltrando] = useState(false);
  const [buscaLocal, setBuscaLocal] = useState('');
  const [opcoesAutoComplete, setOpcoesAutoComplete] = useState([]);

  // Carrega salas do backend e configura autocomplete
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('https://my-office-web.onrender.com/salas');
        const data = await response.json();
        setSalas(data);

        // Monta opções para autocomplete baseado em rua, bairro, cidade e estado
        const locais = new Set();
        data.forEach((sala) => {
          [sala.rua, sala.bairro, sala.cidade, sala.estado].forEach((loc) => {
            if (loc) locais.add(loc);
          });
        });
        setOpcoesAutoComplete([...locais]);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);

  // Aplica filtros e busca com debounce
  useEffect(() => {
    if (!salas.length) return;

    setFiltrando(true);
    const delay = setTimeout(() => {
      const tiposSelecionados = Object.keys(filtros).filter((tipo) => filtros[tipo]);

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
          buscaLocal.trim() === '' ||
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

  // Atualiza filtros de tipo
  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <AppBarLogado />

      <Box
        sx={{
          display: 'flex',
          p: 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
        }}
      >
        {/* Filtros */}
        <Paper
          elevation={3}
          sx={{
            minWidth: 250,
            p: 3,
            borderRadius: 3,
            position: isMobile ? 'static' : 'sticky',
            top: 20,
          }}
        >
          <Typography variant="h6">Filtros</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2">Tipo</Typography>
          <FormGroup>
            {Object.keys(filtros).map((tipo) => (
              <FormControlLabel
                key={tipo}
                control={
                  <Checkbox name={tipo} checked={filtros[tipo]} onChange={handleFiltroChange} />
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
        </Paper>

        {/* Resultados e busca */}
        <Box sx={{ flexGrow: 1 }}>
          <Autocomplete
            freeSolo
            options={buscaLocal.trim() === '' ? [] : opcoesAutoComplete}
            inputValue={buscaLocal}
            onInputChange={(e, val) => setBuscaLocal(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Digite rua, bairro, cidade ou estado"
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
          />

          <Typography variant="h5" mb={2}>
            Resultados
          </Typography>

          {(loading || filtrando) && (
            <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
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
            <Grid container spacing={3}>
              {salasFiltradas.map((sala) => (
                <Grid item xs={12} sm={6} md={4} key={sala.id}>
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
    </>
  );
}
