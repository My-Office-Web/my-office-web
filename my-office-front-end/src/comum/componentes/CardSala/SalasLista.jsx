import React, { useEffect, useState, useContext } from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import CardSala from './CardSala';
import SkeletonCardSala from './SkeletonCardSala';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import { SalasContext } from '../SalasContext/SalasContext';

const normalizarTexto = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function SalasLista({ filtros }) {
  const { salas, loading } = useContext(SalasContext);
  const [filtrando, setFiltrando] = useState(false);
  const [salasFiltradas, setSalasFiltradas] = useState([]);

  const auth = new ServicoAutenticacao();
  const usuarioLogado = auth.obterUsuario();

  // Filtro com Skeleton
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
    }, 800);

    return () => clearTimeout(timeout);
  }, [filtros, salas]);

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

  if (salasFiltradas.length === 0) {
    return (
      <Typography variant="h6" align="center">
        Nenhuma sala encontrada com os filtros informados.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Lista de Salas
        </Typography>
      </Container>

      <Grid container spacing={10} justifyContent="center">
        {salasFiltradas.map((sala) => (
          <Grid item xs={12} sm={6} md={4} key={sala.id_sala}>
            <CardSala
              usuarioId={usuarioLogado?.id}
              salaId={sala.id_sala}
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
