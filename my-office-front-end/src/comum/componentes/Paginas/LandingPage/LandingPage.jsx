import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          color: 'white',
          backgroundImage: `
            linear-gradient(rgba(0, 87, 255, 0.8), rgba(0, 87, 255, 0.8)),
            url('https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=1350&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          px: { xs: 3, sm: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: 1200 }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight={700}
                sx={{ mb: 3, lineHeight: 1.2, letterSpacing: 0.5 }}
              >
                Proporcione espaços incríveis com o MyOffice
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 5, lineHeight: 1.6, opacity: 0.9 }}
              >
                Conecte profissionais e empresas aos melhores espaços para reuniões, eventos e coworking.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 3,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/"
                  sx={{
                    backgroundColor: '#FF5A00',
                    '&:hover': { backgroundColor: '#e64a00' },
                    minWidth: 180,
                    fontWeight: 'bold',
                    px: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(255, 90, 0, 0.4)',
                  }}
                >
                  Anunciar agora!
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
                    minWidth: 180,
                    fontWeight: 'bold',
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Visite nossa página
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: { xs: 6, md: 0 },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 3,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                  backgroundImage: `url('https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 300,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Estatísticas */}
      <Container maxWidth="lg" sx={{ py: 10, px: { xs: 3, sm: 5, md: 8 }, maxWidth: 1200 }}>
        <Grid container spacing={5} justifyContent="center">
          {[
            { valor: '3.000+', descricao: 'empresas tech em Florianópolis' },
            { valor: '120+', descricao: 'espaços corporativos ativos' },
            { valor: '27%', descricao: 'população trabalhando remotamente' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 5,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  cursor: 'default',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Typography variant="h5" color="#0057ff" fontWeight={700} sx={{ mb: 1 }}>
                  {item.valor}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.descricao}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
