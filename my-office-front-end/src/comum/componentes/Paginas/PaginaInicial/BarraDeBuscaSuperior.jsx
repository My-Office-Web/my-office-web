import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
  Divider,
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // agora o layout é vertical
        minHeight: 400,
        backgroundColor: 'inherit',
        overflow: 'hidden',
      }}
    >
      {/* Imagem ocupando 100% da largura */}
      <Box
        sx={{
          width: '100%',
          height: 300, // altura da imagem, você pode ajustar
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
          <TextField
            variant="outlined"
            placeholder="Digite o nome da rua, bairro ou cidade"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            fullWidth
            sx={{ flex: 1, minWidth: 600 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
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
