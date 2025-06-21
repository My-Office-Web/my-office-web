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

const logos = ['Google', 'Amazon', 'Nubank', 'iFood', 'TOTVS'];
const steps = [
  { title: 'Cadastre seu espaço', desc: 'Descreva e carregue fotos profissionais do seu espaço.' },
  { title: 'Alcance milhares de clientes', desc: 'Seja encontrado por empresas e profissionais qualificados.' },
  { title: 'Gerencie reservas com confiança', desc: 'Contratos digitais e pagamentos protegidos, tudo fácil e seguro.' },
];
const benefits = [
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 60, color: '#FF5A00', mb: 2 }} />,
    title: 'Divulgação Premium',
    desc: 'Anúncios segmentados que atingem o público certo em todo o Brasil.',
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 60, color: '#FF5A00', mb: 2 }} />,
    title: 'Receita Extra Garantida',
    desc: 'Transforme seu espaço ocioso em uma fonte de renda mensal consistente.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 60, color: '#FF5A00', mb: 2 }} />,
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
  return (
    <Box sx={{ bgcolor: '#f4f7fb', overflowX: 'hidden' }}>

      {/* LOGOS */}
      <Container  sx={{ py: 8 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 4, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', color: '#555' }}
        >
          Confiança das maiores empresas do Brasil
        </Typography>
        <Grid container justifyContent="center" spacing={6}>
          {logos.map((logo, i) => (
            <Grid
              item
              key={i}
              sx={{
                filter: 'grayscale(80%)',
                transition: 'filter 0.3s ease',
                '&:hover': { filter: 'grayscale(0%)' },
              }}
            >
              <img
                src={`https://dummyimage.com/140x50/cccccc/000000&text=${logo}`}
                alt={`Logo ${logo}`}
                style={{ maxHeight: 50, borderRadius: 6, boxShadow: '0 3px 14px rgba(0,0,0,0.12)' }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* BENEFÍCIOS */}
      <Box sx={{ bgcolor: '#fff', py: 14 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }} >
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ mb: 10, letterSpacing: 1.3, color: '#003c8f', textTransform: 'uppercase' }}
          >
            Por que anunciar com a My Office?
          </Typography>
          <Grid container spacing={8}>
            {benefits.map((b, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 6,
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    cursor: 'default',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 18px 40px rgba(255,90,0,0.45)',
                    },
                  }}
                >
                  {b.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: '#FF5A00', textTransform: 'uppercase', mb: 2 }}
                  >
                    {b.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {b.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* QUEM SOMOS */}
      <Box sx={{ bgcolor: '#f0f4fb', py: 14 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            fontWeight="900"
            gutterBottom
            sx={{ mb: 7, letterSpacing: 2, color: '#002366', textTransform: 'uppercase' }}
          >
            Quem somos
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 9, fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.7 }}
          >
            A My Office é a plataforma líder em reservas de espaços corporativos, conectando profissionais e empresas a ambientes modernos, flexíveis e seguros para otimizar seu tempo e resultados.
          </Typography>
  
          <Grid container spacing={8}>
            {[
              {
                title: 'Missão',
                desc: 'Oferecer espaços de alto padrão com tecnologia avançada para negócios seguros e eficientes.',
              },
              {
                title: 'Visão',
                desc: 'Ser a plataforma número 1 do Brasil para espaços corporativos flexíveis e confiáveis.',
              },
              {
                title: 'Valores',
                desc: 'Inovação, qualidade e flexibilidade para atender a todas as demandas do mercado corporativo.',
              },
            ].map((item, idx) => (
              <Container maxWidth="sm" sx={{ textAlign: 'center' }} >
              <Grid item xs={12} md={4} key={idx}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 6,
                    borderRadius: 6,
                    color: '#1a1a1a',
                    boxShadow: '0 6px 22px rgba(0,0,0,0.1)',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 42px rgba(0,87,255,0.3)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: '#0057ff', textTransform: 'uppercase', mb: 3 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
              </Container>
            ))}
          </Grid>

          <Box sx={{ mt: 12 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ letterSpacing: 0.8, textTransform: 'uppercase', color: '#003c8f' }}
            >
              Por que escolher a My Office?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth={620}
              mx="auto"
              sx={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.6 }}
            >
              Para quem busca flexibilidade, segurança e tecnologia de ponta, somos a solução definitiva para transformar espaços ociosos em oportunidades reais de negócio.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* COMO FUNCIONA */}
      <Container sx={{ py: 14 }}>
        <Typography
          variant="h4"
          fontWeight="900"
          textAlign="center"
          sx={{ mb: 10, letterSpacing: 1.5, color: '#002366', textTransform: 'uppercase' }}
        >
          Como funciona?
        </Typography> 
        <Container maxWidth="sm" sx={{ textAlign: 'center' }} >
        <Grid container spacing={8}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={7}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 6,
                  color: '#222',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 18px 35px rgba(0,87,255,0.25)',
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: '#0057ff', textTransform: 'uppercase' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </Container>
      </Container>

      {/* DEPOIMENTOS */}
      <Box sx={{ backgroundColor: '#eaf4ff', py: 14 }}>
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="900"
            sx={{ mb: 10, color: '#003c8f', letterSpacing: 1.5, textTransform: 'uppercase' }}
          >
            O que nossos clientes dizem
          </Typography>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={8000}
            emulateTouch
            swipeable
            stopOnHover
            dynamicHeight={false}
            showArrows={true}
          >
            {testimonials.map((depo, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: 'center',
                  px: { xs: 3, md: 16 },
                  py: 7,
                  maxWidth: 720,
                  mx: 'auto',
                  bgcolor: 'white',
                  borderRadius: 6,
                  boxShadow: '0 10px 35px rgba(0,87,255,0.18)',
                  userSelect: 'none',
                }}
              >
                <Avatar
                  src={depo.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 4,
                    border: '4px solid #FF5A00',
                    boxShadow: '0 2px 15px rgba(255,90,0,0.5)',
                  }}
                />
                <Typography
                  variant="body1"
                  fontStyle="italic"
                  sx={{ mb: 4, fontSize: '1.2rem', fontWeight: 600, color: '#333' }}
                >
                  “{depo.text}”
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#0057ff', fontSize: '1.1rem' }}>
                  {depo.name}
                </Typography>
              </Box>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* FAQ */}
      <Container sx={{ py: 14, maxWidth: 'md' }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="900"
          sx={{ mb: 10, letterSpacing: 1.5, color: '#002366', textTransform: 'uppercase' }}
        >
          Dúvidas Frequentes
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion
            key={i}
            sx={{
              mb: 4,
              borderRadius: 5,
              boxShadow: '0 3px 22px rgba(0,0,0,0.07)',
              '&:hover': { boxShadow: '0 6px 36px rgba(0,87,255,0.18)' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#0057ff' }} />}
              sx={{
                bgcolor: '#f0f5ff',
                borderRadius: 5,
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#003c8f',
                textTransform: 'capitalize',
              }}
            >
              {faq.q}
            </AccordionSummary>
            <AccordionDetails sx={{ fontSize: '1.1rem', color: '#555' }}>{faq.a}</AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* CTA FINAL */}
      <Box
        sx={{
          bgcolor: '#0057ff',
          py: 12,
          textAlign: 'center',
          color: 'white',
          px: 3,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          boxShadow: '0 -10px 30px rgba(0,87,255,0.7)',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 3, letterSpacing: 2, textTransform: 'uppercase', maxWidth: 620, mx: 'auto' }}
        >
          Está pronto para transformar seu espaço em lucro?
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/"
          sx={{
            bgcolor: '#FF5A00',
            px: 8,
            py: 2.5,
            fontWeight: 'bold',
            borderRadius: 6,
            fontSize: '1.15rem',
            boxShadow: '0 12px 32px rgba(255,90,0,0.8)',
            '&:hover': {
              bgcolor: '#e64a00',
              boxShadow: '0 14px 38px rgba(230,74,0,0.95)',
            },
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
          }}
        >
          Quero anunciar agora
        </Button>
      </Box>
    </Box>
  );
}
