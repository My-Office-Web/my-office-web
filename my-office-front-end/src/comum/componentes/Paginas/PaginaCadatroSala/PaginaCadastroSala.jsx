import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';

export default function CadastroSalaCompleto() {
  const [preview, setPreview] = useState(null);
  const [tipoSala, setTipoSala] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCancelar = () => {
    alert('Cadastro cancelado.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, sm: 6 },
          width: '100%',
          maxWidth: 900,
          borderRadius: 4,
          bgcolor: '#ffffff',
        }}
      >
        <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
          Cadastro de Sala
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Preencha os campos abaixo para cadastrar sua sala de forma rápida e elegante.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="CEP" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Estado" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Cidade" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Bairro" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Rua" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Número" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Preço (Diária)" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Capacidade" fullWidth variant="outlined" size="medium" sx={{ height: 56 }} />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="tipo-label">Tipo de Sala</InputLabel>
              <Select
                labelId="tipo-label"
                id="tipo"
                value={tipoSala}
                onChange={(e) => setTipoSala(e.target.value)}
                label="Tipo de Sala"
                sx={{ height: 56, width: 225, fontSize: '1rem', borderRadius: 2, backgroundColor: '#f3f4f6' }}
              >
                <MenuItem value="comercial">Comercial</MenuItem>
                <MenuItem value="corporativo">Corporativo</MenuItem>
                <MenuItem value="educacional">Educacional</MenuItem>
                <MenuItem value="residencial">Residencial</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descrição"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight={500} gutterBottom>
              Imagem da Sala
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              fullWidth
            >
              Importar Imagem
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            {preview && (
              <Box>
                <Typography variant="body2" mb={1}>
                  Preview da Imagem
                </Typography>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelar}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                Cadastrar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}