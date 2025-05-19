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

export default function FiltroImoveis() {
  const [local, setLocal] = React.useState('');
  const [tipo, setTipo] = React.useState('Todos as salas');

  const tiposImovel = [
    'Todos as salas',
    'Residencial',
    'Comercial',
    'Corporativo',
    'Educacional',
  ];

  return (
   <Box
  sx={{
    display: 'flex',
    minHeight: 400,
    backgroundColor: '#fff7f5',
    overflow: 'hidden',
  }}

    >
      {/* Lado esquerdo com imagem */}
      <Box
        sx={{
          width: '25%',
          backgroundImage: `url('/sala.jpeg')`,
          backgroundSize: 'cover',
          borderRadius: '0 0 60px 0',
          backgroundPosition: 'center',
          
        }}
      />

      {/* Lado direito com conteúdo */}
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
        <Typography variant="h4" fontWeight="bold" color="#2d2d2d" mb={2}>
          O espaço ideal para você está aqui. <br />
          Só na MyOffice você encontra os melhores lugares para seus encontros.
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
          >
            Buscar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
