import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
  Divider,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function FiltroImoveis({ local, tipo, setLocal, setTipo, onBuscar }) {
  const tiposImovel = [
    'Todas as salas',
    'Comercial',
    'Corporativo',
    'Educacional',
    'Residencial',
  ];

  const [opcoesAutoComplete, setOpcoesAutoComplete] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch('https://my-office-web.onrender.com/salas');
        const data = await response.json();

        const locais = new Set();
        data.forEach((sala) => {
          [sala.rua, sala.bairro, sala.cidade, sala.estado].forEach((loc) => {
            if (loc) locais.add(loc);
          });
        });

        setOpcoesAutoComplete([...locais]);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocais();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // layout vertical
        minHeight: 400,
        backgroundColor: 'inherit',
        overflow: 'hidden',
      }}
    >
      {/* Imagem ocupando 100% da largura */}
      <Box
        sx={{
          width: '100%',
          height: 300,
          backgroundImage: `url('/sala.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Conteúdo abaixo da imagem */}
      <Box
        sx={{
          width: '100%',
          py: 5,
          px: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#3d4351" mb={2}>
          O espaço ideal para você está aqui! <br />
        </Typography>

        <Divider sx={{ maxWidth: 600, mx: 'auto', mb: 3, borderColor: '#dcdcdc' }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            maxWidth: 1000,
            mx: 'auto',
          }}
        >
          <Autocomplete
            freeSolo
            options={local.trim() === '' ? [] : opcoesAutoComplete}
            inputValue={local}
            onInputChange={(e, val) => setLocal(val)}
            sx={{ flex: 1, minWidth: 600 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Digite o nome da rua, bairro ou cidade"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                size="medium"
              />
            )}
          />

          <TextField
            select
            variant="outlined"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            fullWidth
            sx={{ flex: 1, minWidth: 200 }}
          >
            {tiposImovel.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            sx={{
              minWidth: 120,
              px: 4,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: '#FF5A00',
              '&:hover': {
                backgroundColor: '#e64a00',
              },
            }}
            onClick={onBuscar}
          >
            Buscar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
