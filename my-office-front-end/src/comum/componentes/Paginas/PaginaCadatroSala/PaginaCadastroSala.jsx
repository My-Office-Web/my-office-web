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
  const [form, setForm] = useState({
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    preco: '',
    capacidade: '',
    descricao: '',
    imagem: '',
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setPreview(base64);
      setForm({ ...form, imagem: base64 });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancelar = () => {
    setForm({
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      preco: '',
      capacidade: '',
      descricao: '',
      imagem: '',
    });
    setTipoSala('');
    setPreview(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/salas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          tipo: tipoSala,
          preco: parseFloat(form.preco),
          capacidade: parseInt(form.capacidade),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar sala');
      }

      alert('Sala cadastrada com sucesso!');
      handleCancelar();
    } catch (error) {
      alert('Erro ao cadastrar sala.');
      console.error(error);
    }
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
            <TextField
              name="cep"
              label="CEP"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.cep}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="estado"
              label="Estado"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.estado}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="cidade"
              label="Cidade"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.cidade}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="bairro"
              label="Bairro"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.bairro}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="rua"
              label="Rua"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.rua}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="numero"
              label="Número"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.numero}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="preco"
              label="Preço (Diária)"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.preco}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="capacidade"
              label="Capacidade"
              fullWidth
              variant="outlined"
              size="medium"
              sx={{ height: 56 }}
              value={form.capacidade}
              onChange={handleChange}
            />
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
                sx={{
                  height: 56,
                  width: 225,
                  fontSize: '1rem',
                  borderRadius: 2,
                  backgroundColor: '#f3f4f6',
                }}
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
              name="descricao"
              label="Descrição"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={form.descricao}
              onChange={handleChange}
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
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
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
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              mt={3}
            >
              <Button variant="outlined" color="secondary" onClick={handleCancelar}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
                onClick={handleSubmit}
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
