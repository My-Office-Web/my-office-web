import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import { Link as RouterLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTheme } from '@mui/material/styles';

const logos = ['Google', 'Amazon', 'Nubank', 'iFood', 'TOTVS'];
const steps = [
  { title: 'Cadastre seu espaço', desc: 'Descreva e carregue fotos profissionais do seu espaço.' },
  { title: 'Alcance milhares de clientes', desc: 'Seja encontrado por empresas e profissionais qualificados.' },
  { title: 'Gerencie reservas com confiança', desc: 'Contratos digitais e pagamentos protegidos, tudo fácil e seguro.' },
];
const benefits = [
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 60, color: '#1976d3', mb: 2 }} />,
    title: 'Divulgação Premium',
    desc: 'Anúncios segmentados que atingem o público certo em todo o Brasil.',
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 60, color: '#1976d3', mb: 2 }} />,
    title: 'Receita Extra Garantida',
    desc: 'Transforme seu espaço ocioso em uma fonte de renda mensal consistente.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 60, color: '#1976d3', mb: 2 }} />,
    title: 'Segurança Total',
    desc: 'Suporte ativo, contratos digitais e pagamentos 100% seguros na plataforma.',
  },
];
const testimonials = [
  {
    name: 'Marina Costa',
    text: 'Consegui 4 reservas já no primeiro mês. A plataforma é fácil, rápida e segura!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'João Mendes',
    text: 'Aluguei uma sala para minha startup com poucos cliques. Recomendo muito!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ana Lúcia',
    text: 'Plataforma intuitiva e suporte sempre pronto para ajudar. Excelente experiência.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];
const faqs = [
  {
    q: 'Que tipos de espaços posso anunciar?',
    a: 'Aceitamos salas comerciais, escritórios, consultórios, coworkings e outros espaços corporativos.',
  },
  {
    q: 'Como funciona a segurança na plataforma?',
    a: 'Todos os contratos são digitais e os pagamentos são protegidos por sistemas avançados de segurança.',
  },
  {
    q: 'Tenho algum custo para anunciar?',
    a: 'O cadastro é gratuito. Você paga uma pequena taxa somente após o aluguel ser confirmado.',
  },
];

export default function LandingPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, overflowX: 'hidden' }}>

      {/* SEÇÃO DE LOGOS */}
      <Box sx={{ bgcolor: isDark ? theme.palette.grey[900] : '#EEF0FF', py: 6 }}>
        <Container>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: isDark ? theme.palette.grey[100] : '#1976d3',
            }}
          >
            Confiado por grandes empresas
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {logos.map((logo, i) => (
              <Grid item key={i}>
                <Box
                  component="img"
                  src={`https://dummyimage.com/140x50/${isDark ? '333333' : 'ffffff'}/000000&text=${logo}`}
                  alt={`Logo ${logo}`}
                  sx={{
                    height: 50,
                    width: 140,
                    objectFit: 'contain',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    filter: 'grayscale(100%)',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                      transform: 'scale(1.08)',
                      boxShadow: `0 4px 20px ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(108,99,255,0.3)'}`,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* BENEFÍCIOS */}
      <Box sx={{ bgcolor: isDark ? theme.palette.background.paper : '#ffffff', py: 12 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 8, color: isDark ? '#fff' : '#1976d3' }}>
            Por que anunciar com a My Office?
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {benefits.map((b, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper elevation={3} sx={{ p: 5, borderRadius: '20px', textAlign: 'center', backgroundColor: isDark ? theme.palette.grey[800] : '#fdfcff', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: isDark ? '0 12px 24px rgba(255,255,255,0.1)' : '0 12px 24px rgba(108,99,255,0.2)' } }}>
                  {b.icon}
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1976d3', mt: 2 }}>{b.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontSize: '1rem', color: isDark ? theme.palette.grey[300] : 'text.secondary' }}>{b.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* COMO FUNCIONA */}
      <Box sx={{ bgcolor: isDark ? theme.palette.background.default : '#f4f6ff', py: 12 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 8, color: isDark ? '#fff' : '#1976d3' }}>Como funciona?</Typography>
          <Grid container spacing={6} justifyContent="center">
            {steps.map((step, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper elevation={2} sx={{ p: 5, borderRadius: '20px', backgroundColor: isDark ? theme.palette.grey[800] : '#fff', transition: 'all 0.3s', '&:hover': { boxShadow: isDark ? '0 10px 30px rgba(255,255,255,0.08)' : '0 10px 30px rgba(108,99,255,0.2)', transform: 'translateY(-6px)' } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#1976d3', mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: isDark ? theme.palette.grey[300] : 'text.secondary' }}>{step.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

{/* DEPOIMENTOS */}
<Box sx={{ bgcolor: isDark ? theme.palette.background.paper : '#fdfcff', py: 12 }}>
  <Container>
    <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 8, color: isDark ? '#fff' : '#1976d3' }}>
      O que nossos clientes dizem
    </Typography>
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={8000} emulateTouch swipeable stopOnHover dynamicHeight={false} showArrows>
      {testimonials.map((depo, i) => (
        <Box
          key={i}
          sx={{
            textAlign: 'center',
            px: { xs: 2, md: 12 },
            py: 6,
            maxWidth: 720,
            mx: 'auto',
            bgcolor: isDark ? theme.palette.grey[800] : 'white',
            borderRadius: 6,
            boxShadow: isDark
              ? '0 10px 30px rgba(255,255,255,0.1)'
              : '0 10px 30px rgba(108,99,255,0.12)',
            userSelect: 'none',
          }}
        >
          <Avatar
            src={depo.avatar}
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
              border: `3px solid ${isDark ? theme.palette.primary.light : '#6C63FF'}`,
            }}
          />
          <Typography
            variant="body1"
            fontStyle="italic"
            sx={{ mb: 3, fontSize: '1.1rem', color: isDark ? theme.palette.grey[300] : '#555' }}
          >
            “{depo.text}”
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: isDark ? '#fff' : '#1976d3' }}>
            {depo.name}
          </Typography>
        </Box>
      ))}
    </Carousel>
  </Container>
</Box>

{/* FAQ */}
<Box sx={{ py: 12, bgcolor: isDark ? theme.palette.background.default : '#f4f6ff' }}>
  <Container maxWidth="md">
    <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 8, color: isDark ? '#fff' : '#1976d3' }}>
      Dúvidas Frequentes
    </Typography>
    {faqs.map((faq, i) => (
      <Accordion
        key={i}
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: isDark
            ? '0 3px 12px rgba(255,255,255,0.06)'
            : '0 3px 12px rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: isDark
              ? '0 6px 20px rgba(255,255,255,0.12)'
              : '0 6px 20px rgba(108,99,255,0.12)',
          },
          bgcolor: isDark ? theme.palette.grey[800] : 'unset',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1976d3' }} />}
          sx={{ bgcolor: isDark ? theme.palette.grey[900] : '#fff', borderRadius: 3 }}
        >
          <Typography sx={{ fontWeight: 600, color: isDark ? '#fff' : '#1976d3' }}>{faq.q}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: isDark ? theme.palette.grey[300] : '#555' }}>{faq.a}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Container>
</Box>

      {/* CTA FINAL */}
      <Box sx={{ bgcolor: '#1976d3', py: 10, textAlign: 'center', color: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, px: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, letterSpacing: 1 }}>
          Está pronto para transformar seu espaço em lucro?
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/"
          sx={{
            bgcolor: 'white',
            color: '#1976d3',
            px: 6,
            py: 2,
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': { bgcolor: '#f0f0ff', color: '#1976d3' },
          }}
        >
          Quero anunciar agora
        </Button>
      </Box>
    </Box>
  );
}
