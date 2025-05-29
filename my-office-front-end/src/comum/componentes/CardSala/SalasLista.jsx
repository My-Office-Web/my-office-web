import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import CardSala from './CardSala';
import { WrapText } from '@mui/icons-material';

export default function SalasLista() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (salas.length === 0) {
    return <Typography variant="h6" align="center">Nenhuma sala cadastrada ainda.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Lista de Salas
      </Typography>

      <Grid
        container
        spacing={10}
        justifyContent="center"
        
      >
        {salas.map((sala) => (
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
