import * as React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  styled,
  Box,
  Tooltip,
} from '@mui/material';
import { red, orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ExpandMore = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardSala({
  titulo = 'Sala Corporativa Premium',
  endereco = 'Av. Paulista, 1000 - São Paulo, SP',
  imagemBase64,
  descricao = 'Espaço moderno e equipado para reuniões, treinamentos e workshops.',
  preco = '250',
  capacidade = '20',
  whatsapp = '5511999999999',
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [favorito, setFavorito] = React.useState(false);

  const handleExpandClick = () => setExpanded(prev => !prev);
  const handleFavoritar = () => setFavorito(prev => !prev);

  const handleCompartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: titulo,
          text: descricao,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      alert('O compartilhamento não é suportado neste navegador.');
    }
  };

  const handleWhatsAppClick = () => {
    const numeroLimpo = whatsapp.replace(/\D/g, '');
    const link = `https://wa.me/${numeroLimpo}?text=Olá, gostaria de saber mais sobre a sala "${titulo}".`;
    window.open(link, '_blank');
  };

  return (
    <Card
      sx={{
        maxWidth: 360,
        borderRadius: 3,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
      elevation={4}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>}
        title={<Typography variant="h6" noWrap>{titulo}</Typography>}
        subheader={
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              title={endereco}
            >
              {endereco}
            </Typography>
          </Box>
        }
      />
      <CardMedia
        component="img"
        height="180"
        image={imagemBase64}
        alt={`Imagem da ${titulo}`}
        sx={{ cursor: 'pointer', objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Tooltip title="Preço por diária" arrow>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon sx={{ color: 'success.main' }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {preco}
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Capacidade" arrow>
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleAltIcon sx={{ color: 'text.secondary' }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {capacidade} pessoas
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {descricao}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="favoritar"
          onClick={handleFavoritar}
          sx={{ color: favorito ? orange[600] : 'inherit' }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="compartilhar"
          color="primary"
          onClick={handleCompartilhar}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="whatsapp"
          color="success"
          onClick={handleWhatsAppClick}
        >
          <WhatsAppIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
