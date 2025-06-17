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
  Button,
  Modal,
  CircularProgress,
  Drawer,
  IconButton,
} from '@mui/material';
import { FaFilter } from "react-icons/fa";
import CardSala from '../../CardSala/CardSala';
import SkeletonCardSala from '../../CardSala/SkeletonCardSala';
import AppBarLogado from '../PaginaLogado/AppBarLogado';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

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

  const [modalMapaAberto, setModalMapaAberto] = useState(false);

  // Novo estado: drawer do filtro aberto ou fechado
  const [drawerFiltroAberto, setDrawerFiltroAberto] = useState(false);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('https://my-office-web.onrender.com/salas');
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
        console.error('Erro ao buscar salas:', error);
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

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.checked });
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDjT2WABBTtCsB6n_yKSO3iLH1v5woOh6U',
  });

  const calcularCentro = () => {
    if (!salasFiltradas.length) return { lat: -27.5945, lng: -46.633308 };

    const latSum = salasFiltradas.reduce((acc, sala) => acc + parseFloat(sala.latitude), 0);
    const lngSum = salasFiltradas.reduce((acc, sala) => acc + parseFloat(sala.longitude), 0);

    return {
      lat: latSum / salasFiltradas.length,
      lng: lngSum / salasFiltradas.length,
    };
  };

  return (
    <>
      <AppBarLogado />

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Barra de busca + botão abrir filtro */}
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            color="primary"
            onClick={() => setDrawerFiltroAberto(true)}
            aria-label="Abrir filtros"
            sx={{ ml: 1 }}
          >
            <FaFilter />
          </IconButton>
          <Autocomplete
            freeSolo
            options={buscaLocal.trim() === '' ? [] : opcoesAutoComplete}
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
          <Button variant="outlined" onClick={() => setModalMapaAberto(true)} disabled={salasFiltradas.length === 0}>
            Ver todas no mapa
          </Button>
        </Box>

        {/* Resultados */}
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
          <Box display="flex" justifyContent="center">
          <Grid
            container
            spacing={3}
            sx={{ maxWidth: '1600px' }} // opcional: para não ocupar largura total em telas grandes
          >
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
                  latitude={sala.latitude}
                  longitude={sala.longitude}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        )}
      </Box>

      {/* Drawer lateral dos filtros */}
      <Drawer
        anchor="left"
        open={drawerFiltroAberto}
        onClose={() => setDrawerFiltroAberto(false)}
        PaperProps={{ sx: { width: isMobile ? '80vw' : 300, p: 3 } }}
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
              control={<Checkbox name={tipo} checked={filtros[tipo]} onChange={handleFiltroChange} />}
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
          <Button variant="contained" fullWidth onClick={() => setDrawerFiltroAberto(false)}>
            Aplicar e Fechar
          </Button>
        </Box>
      </Drawer>

      {/* Modal mapa geral */}
      <Modal open={modalMapaAberto} onClose={() => setModalMapaAberto(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', sm: '80vw', md: '70vw' },
            height: { xs: '70vh', sm: '70vh', md: '75vh' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={calcularCentro()}
              zoom={13}
            >
              {salasFiltradas.map((sala) => (
                <Marker
                  key={sala.id}
                  position={{
                    lat: parseFloat(sala.latitude),
                    lng: parseFloat(sala.longitude),
                  }}
                  title={`Sala ${sala.tipo} - R$${sala.preco}`}
                />
              ))}
            </GoogleMap>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
