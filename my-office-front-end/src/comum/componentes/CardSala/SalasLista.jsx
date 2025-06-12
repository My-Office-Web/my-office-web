import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CardSala from './CardSala';
import SkeletonCardSala from './SkeletonCardSala'; // Certifique-se do caminho

const normalizarTexto = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function SalasLista({ filtros }) {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtrando, setFiltrando] = useState(false);
  const [salasFiltradas, setSalasFiltradas] = useState([]);

  // Carregamento inicial das salas
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('https://my-office-web.onrender.com/salas');
        const data = await response.json();
        setSalas(data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  // Filtro com carregamento simulado (Skeleton)
  useEffect(() => {
    if (!salas || salas.length === 0) {
      setSalasFiltradas([]);
      return;
    }

    setFiltrando(true);

    const timeout = setTimeout(() => {
      const { local, tipo } = filtros;
      const buscaNormalizada = normalizarTexto(local || '');

      const resultado = salas.filter((sala) => {
        const bairro = normalizarTexto(sala.bairro);
        const cidade = normalizarTexto(sala.cidade);
        const estado = normalizarTexto(sala.estado);
        const rua = normalizarTexto(sala.rua);
        const tipoSala = normalizarTexto(sala.tipo);

        const localValido =
          !buscaNormalizada ||
          bairro.includes(buscaNormalizada) ||
          cidade.includes(buscaNormalizada) ||
          estado.includes(buscaNormalizada) ||
          rua.includes(buscaNormalizada);

        const tipoFiltroValido =
          normalizarTexto(tipo) === 'todas as salas' || tipoSala === normalizarTexto(tipo);

        return localValido && tipoFiltroValido;
      });

      setSalasFiltradas(resultado);
      setFiltrando(false);
    }, 800); // tempo do skeleton ao filtrar

    return () => clearTimeout(timeout);
  }, [filtros, salas]);

  // Mostra Skeletons durante carregamento inicial ou filtragem
  if (loading || filtrando) {
    return (
      <Box sx={{ width: '100%', mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Carregando Salas...
        </Typography>
        <Grid container spacing={10} justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <SkeletonCardSala />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Nenhuma sala encontrada
  if (salasFiltradas.length === 0) {
    return (
      <Typography variant="h6" align="center">
        Nenhuma sala encontrada com os filtros informados.
      </Typography>
    );
  }

  // Resultado final
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Salas
      </Typography>

      <Grid container spacing={10} justifyContent="center">
        {salasFiltradas.map((sala) => (
          <Grid item xs={12} sm={6} md={4} key={sala.id}>
            <CardSala
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
    </Box>
  );
}
