import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import CardSala from './CardSala';

// Função para normalizar texto (remover acentos, deixar minúsculo)
const normalizarTexto = (texto) =>
  texto
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase(); // minúsculo

export default function SalasLista({ filtros }) {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salasFiltradas, setSalasFiltradas] = useState([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://localhost:3000/salas');
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

  useEffect(() => {
    if (!salas || salas.length === 0) {
      setSalasFiltradas([]);
      return;
    }

    const { local, tipo } = filtros;
    const buscaNormalizada = normalizarTexto(local || '');

    const resultado = salas.filter((sala) => {
      const bairro = normalizarTexto(sala.bairro);
      const cidade = normalizarTexto(sala.cidade);
      const estado = normalizarTexto(sala.estado);
      const rua = normalizarTexto(sala.rua);
      const tipoSala = normalizarTexto(sala.tipo);

      // Busca em campos separados
      const localValido =
        !buscaNormalizada ||
        bairro.includes(buscaNormalizada) ||
        cidade.includes(buscaNormalizada) ||
        estado.includes(buscaNormalizada) ||
        rua.includes(buscaNormalizada);

      // Filtro por tipo
      const tipoFiltroValido =
        normalizarTexto(tipo) === 'todas as salas' || tipoSala === normalizarTexto(tipo);

      return localValido && tipoFiltroValido;
    });

    setSalasFiltradas(resultado);
  }, [filtros, salas]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
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
