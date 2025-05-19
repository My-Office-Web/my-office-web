import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Fade } from '@mui/material';

const CustomCarousel = ({ width = '100%', height = 320, borderRadius = 6 }) => {
  const banners = [
    {
      title: 'As melhores salas de reuniões estão aqui',
      subtitle: 'Só na MyOffice você encontra',
      buttonText: 'Eu quero',
      image: '/sala.jpeg',
      bgColor: '#0057ff',
      buttonColor: '#FF5A00',
    },
    {
      title: 'Seu novo escritório te espera!',
      subtitle: 'Ambientes prontos para receber seu sucesso',
      buttonText: 'Encontre agora',
      image: '/sala-vazia.jpg',
      bgColor: '#0057ff',
      buttonColor: '#FF5A00',
    },
    {
      title: 'Trabalhe onde você rende mais',
      subtitle: 'Locais inspiradores e profissionais com custo acessível',
      buttonText: 'Ver opções',
      image: '/mulher.png',
      bgColor: '#0057ff',
      buttonColor: '#FF5A00',
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[index];

  return (
    <Box
      sx={{
        width,
        height: 220,
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        boxShadow: 4,
        bgcolor: banner.bgColor,
      }}
    >
      <Fade in key={index} timeout={800}>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          {/* Conteúdo à esquerda */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-start' },
              px: { xs: 2, sm: 4 },
              py: 3,
              color: '#fff',
              textAlign: { xs: 'center', sm: 'left' },
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              {banner.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
            >
              {banner.subtitle}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: banner.buttonColor,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '8px',
                px: 3,
                py: 1.2,
                '&:hover': {
                  backgroundColor: '#e64a00',
                },
              }}
            >
              {banner.buttonText}
            </Button>
          </Box>

          {/* Imagem à direita ocupando toda altura */}
          <Box
            sx={{
              flex: 1,
              height: '100%',
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={banner.image}
              alt={banner.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderTopRightRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
              }}
            />
          </Box>
        </Box>
      </Fade>

      {/* Indicadores */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {banners.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: index === i ? 24 : 16,
              height: 6,
              borderRadius: 3,
              bgcolor: index === i ? '#fff' : '#bbb',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomCarousel;
