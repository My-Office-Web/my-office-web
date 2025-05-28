import * as React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  styled,
  Box,
  Tooltip,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
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
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 360, borderRadius: 4, boxShadow: 6 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="sala">
            S
          </Avatar>
        }
        title={titulo}
        subheader={
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{endereco}</Typography>
          </Box>
        }
      />
      <CardMedia
        component="img"
        height="180"
        image={imagemBase64}
        alt="Imagem da Sala"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Tooltip title="Preço por diária">
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon sx={{ color: 'green' }} />
              <Typography variant="body1" fontWeight={600}>
                {preco}
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Capacidade">
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleAltIcon sx={{ color: 'gray' }} />
              <Typography variant="body1" fontWeight={600}>
                {capacidade} pessoas
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {descricao}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="favoritar">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="compartilhar">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="mostrar mais"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{descricao}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
