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
import { Link as RouterLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const logos = ['Google', 'Amazon', 'Nubank', 'iFood', 'TOTVS'];
const steps = [
  { title: '1. Cadastre seu espaço', desc: 'Informe os detalhes e fotos do seu espaço.' },
  { title: '2. Alcance milhares de pessoas', desc: 'Apareça para profissionais e empresas que buscam locações.' },
  { title: '3. Feche negócios com segurança', desc: 'Negocie, receba e gerencie tudo pela plataforma.' },
];
const benefits = [
  { icon: '📢', title: 'Divulgação inteligente', desc: 'Alcance clientes em todo o Brasil com anúncios segmentados.' },
  { icon: '💰', title: 'Receita extra garantida', desc: 'Transforme espaços ociosos em lucro todos os meses.' },
  { icon: '🛡️', title: 'Segurança em cada etapa', desc: 'Pagamentos protegidos, suporte ativo e contratos digitais.' },
];
const testimonials = [
  {
    name: 'Marina Costa',
    text: 'Já no primeiro mês tive 4 reservas. A plataforma é incrível!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'João Mendes',
    text: 'Consegui alugar uma sala para minha startup em poucos cliques.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ana Lúcia',
    text: 'A plataforma é intuitiva, e o suporte me ajudou em todo o processo.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];
const faqs = [
  {
    q: 'Quais tipos de espaços posso anunciar?',
    a: 'Salas comerciais, escritórios, consultórios, coworkings e muito mais.',
  },
  {
    q: 'É seguro anunciar na plataforma?',
    a: 'Sim! Todo o processo é mediado pela MyOffice com contratos digitais e pagamento garantido.',
  },
  {
    q: 'Preciso pagar algo para anunciar?',
    a: 'Não! Você só paga uma pequena taxa quando o seu espaço for alugado com sucesso.',
  },
];

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', overflowX: 'hidden' }}>
      {/* HERO */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: 3,
          color: 'white',
          textAlign: 'center',
          backgroundImage: `
            linear-gradient(135deg, rgba(0, 87, 255, 0.8), rgba(255, 90, 0, 0.85)),
            url('https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=1400&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={900}
            sx={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7)', mb: 2 }}
          >
            Monetize seu espaço ocioso com segurança e agilidade
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.95, mb: 5, fontWeight: 500, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            Cadastre salas, escritórios ou coworkings e alcance milhares de empresas e profissionais.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/"
            sx={{
              px: 6,
              py: 1.8,
              fontWeight: 'bold',
              borderRadius: 3,
              bgcolor: '#FF5A00',
              boxShadow: '0 6px 15px rgba(255,90,0,0.6)',
              '&:hover': { bgcolor: '#e64a00', boxShadow: '0 8px 20px rgba(230,74,0,0.8)' },
              transition: 'all 0.3s ease',
              letterSpacing: 1,
            }}
          >
            Quero anunciar meu espaço
          </Button>
        </Container>
      </Box>

      {/* LOGOS */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 3, letterSpacing: 2, fontWeight: 600 }}
        >
          Confiança de grandes marcas
        </Typography>
        <Grid container justifyContent="center" spacing={5}>
          {logos.map((logo, i) => (
            <Grid item key={i} sx={{ filter: 'grayscale(70%)', transition: 'filter 0.3s ease', '&:hover': { filter: 'none' } }}>
              <img
                src={`https://dummyimage.com/120x45/cccccc/000000&text=${logo}`}
                alt={`Logo ${logo}`}
                style={{ maxHeight: 45, borderRadius: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* BENEFÍCIOS */}
      <Box sx={{ bgcolor: '#fff', py: 12 }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ mb: 8, letterSpacing: 1, color: '#003c8f' }}
          >
            Por que anunciar com a MyOffice?
          </Typography>
          <Grid container spacing={6}>
            {benefits.map((b, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 5,
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease',
                    cursor: 'default',
                    '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 30px rgba(255,90,0,0.35)' },
                  }}
                >
                  <Typography fontSize={56} sx={{ mb: 3, userSelect: 'none' }}>
                    {b.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#FF5A00' }}>
                    {b.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                    {b.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* QUEM SOMOS */}
      <Box sx={{ bgcolor: '#f5f7fa', py: 12 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 6, letterSpacing: 1 }}
          >
            Quem Somos
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 8, fontSize: '1.1rem', fontWeight: 500 }}
          >
            A My Office é a plataforma líder em reservas de espaços corporativos que conecta profissionais e empresas a ambientes flexíveis, modernos e seguros, facilitando negócios e otimizando seu tempo.
          </Typography>

          <Grid container spacing={6}>
            {[
              {
                title: 'Missão',
                desc: 'Proporcionar espaços de alto padrão com tecnologia e facilidade para que nossos clientes façam negócios de forma segura e eficiente.',
              },
              {
                title: 'Visão',
                desc: 'Ser a escolha número 1 no Brasil para profissionais e empresas que buscam espaços corporativos flexíveis e confiáveis.',
              },
              {
                title: 'Valores',
                desc: 'Inovação, qualidade e flexibilidade para atender todas  as possíveis necessidades do mercado corporativo, educacional e comercial.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    color: '#1a1a1a',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 14px 30px rgba(0,87,255,0.25)' },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#0057ff' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ letterSpacing: 0.7 }}
            >
              Por que escolher a My Office?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth={600}
              mx="auto"
              sx={{ fontSize: '1.1rem', fontWeight: 500 }}
            >
              Se você busca flexibilidade, segurança e tecnologia de ponta, a My Office é a solução para transformar seu espaço em oportunidades reais de negócio.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* COMO FUNCIONA */}
      <Container sx={{ py: 12 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 8, letterSpacing: 1 }}
        >
          Como funciona?
        </Typography>
        <Grid container spacing={6}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={5}
                sx={{
                  p: 5,
                  textAlign: 'center',
                  borderRadius: 4,
                  color: '#222',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 25px rgba(0,87,255,0.2)' },
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#0057ff' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* DEPOIMENTOS */}
      <Box sx={{ backgroundColor: '#e7f0ff', py: 12 }}>
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 8, color: '#003c8f', letterSpacing: 1 }}
          >
            O que nossos clientes dizem
          </Typography>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={7000}
            emulateTouch
            swipeable
            stopOnHover
            dynamicHeight={false}
          >
            {testimonials.map((depo, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: 'center',
                  px: { xs: 3, md: 12 },
                  py: 6,
                  maxWidth: 700,
                  mx: 'auto',
                  bgcolor: 'white',
                  borderRadius: 4,
                  boxShadow: '0 8px 25px rgba(0,87,255,0.15)',
                  userSelect: 'none',
                }}
              >
                <Avatar
                  src={depo.avatar}
                  sx={{
                    width: 72,
                    height: 72,
                    mx: 'auto',
                    mb: 3,
                    border: '3px solid #FF5A00',
                  }}
                />
                <Typography variant="body1" fontStyle="italic" sx={{ mb: 3, fontSize: '1.1rem' }}>
                  “{depo.text}”
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#0057ff' }}>
                  {depo.name}
                </Typography>
              </Box>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* FAQ */}
      <Container sx={{ py: 12 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 8, letterSpacing: 1 }}
        >
          Dúvidas Frequentes
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion
            key={i}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
              '&:hover': { boxShadow: '0 5px 30px rgba(0,87,255,0.15)' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#0057ff' }} />}
              sx={{
                bgcolor: '#f9faff',
                borderRadius: 3,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              <Typography fontWeight="bold">{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'white' }}>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* CALL TO ACTION FINAL */}
      <Box
        sx={{
          py: 14,
          bgcolor: 'linear-gradient(135deg, #FF5A00, #FF8C00)',
          background:
            'linear-gradient(135deg, rgba(255,90,0,0.9), rgba(255,140,0,0.9))',
          color: 'white',
          textAlign: 'center',
          boxShadow: 'inset 0 0 100px rgba(255,90,0,0.6)',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3, letterSpacing: 1 }}
        >
          Pronto para transformar seu espaço?
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/"
          sx={{
            bgcolor: 'white',
            color: '#FF5A00',
            px: 6,
            py: 2,
            fontWeight: 'bold',
            borderRadius: 4,
            boxShadow: '0 6px 20px rgba(255,90,0,0.7)',
            '&:hover': { bgcolor: '#fff3e0' },
            letterSpacing: 1,
            transition: 'all 0.3s ease',
          }}
        >
          Comece agora mesmo
        </Button>
      </Box>
    </Box>
  );
}
