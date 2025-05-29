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
  Modal,
  Divider,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ExpandMore = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)', // seta gira de 0 para 180
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
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
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
        aria-label={`Card da ${titulo}`}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="sala">
              S
            </Avatar>
          }
          title={
            <Typography variant="h6" component="h2" noWrap>
              {titulo}
            </Typography>
          }
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
          onClick={handleModalOpen}
          sx={{ cursor: 'pointer', objectFit: 'cover' }}
          aria-describedby="imagem-ampliada"
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
              cursor: 'default',
              userSelect: 'text',
            }}
            aria-expanded={expanded}
          >
            {descricao}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="favoritar">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="compartilhar" color="primary">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label={expanded ? 'mostrar menos' : 'mostrar mais'}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>

      {/* Modal detalhado */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-titulo"
        aria-describedby="modal-descricao"
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box
          tabIndex={-1}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90vw', sm: 600 },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            overflowY: 'auto',
            outline: 'none',
          }}
        >
          <Typography id="modal-titulo" variant="h5" component="h2" mb={2}>
            {titulo}
          </Typography>

          <Box
            component="img"
            src={imagemBase64}
            alt={`Imagem detalhada da ${titulo}`}
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
              userSelect: 'none',
            }}
          />

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnIcon color="action" />
            <Typography variant="body1">{endereco}</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon color="success" />
              <Typography variant="subtitle1" fontWeight={600}>
                Preço: R$ {preco}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleAltIcon color="action" />
              <Typography variant="subtitle1" fontWeight={600}>
                Capacidade: {capacidade} pessoas
              </Typography>
            </Box>
          </Box>

          <Typography id="modal-descricao" variant="body1" color="text.secondary" paragraph>
            {descricao}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
