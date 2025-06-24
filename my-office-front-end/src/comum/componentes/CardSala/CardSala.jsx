import * as React from 'react';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, IconButton, Typography, styled, Box, Tooltip,
  Modal, Divider, Button, TextField
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { toast } from 'react-toastify';

const ExpandMore = styled(({ expand, ...other }) => (
  <IconButton {...other} />
))(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardSala({
  usuarioId,
  salaId,
  titulo,
  endereco,
  imagemBase64,
  descricao,
  preco,
  capacidade,
  onFavoritoAlterado
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [agendamentoOpen, setAgendamentoOpen] = React.useState(false);
  const [loadingReserva, setLoadingReserva] = React.useState(false);
  const [favorito, setFavorito] = React.useState(false);

  const token = localStorage.getItem('auth-token');

  const handleExpandClick = () => setExpanded(!expanded);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  const handleWhatsAppClick = () => {
    const mensagem = encodeURIComponent(`Olá! Gostaria de reservar a sala "${titulo}".`);
    const url = `https://wa.me/?text=${mensagem}`;
    window.open(url, '_blank');
  };

  const handleToggleFavorito = async () => {
    try {
      const response = await fetch('https://my-office-web.onrender.com/favoritos', {
        method: favorito ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sala_id: salaId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar favorito');
      }

      setFavorito(!favorito);

      if (!favorito) {
        toast.success('Adicionado à sua lista de favoritos!');
      } else {
        toast.info('❌ Removido da sua lista de favoritos.');
      }

      if (onFavoritoAlterado) {
        onFavoritoAlterado(); // 🔥 Atualiza a lista de favoritos no modal
      }

    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar:', error);
      toast.error('Erro ao atualizar favorito.');
    }
  };

  React.useEffect(() => {
    const verificarFavorito = async () => {
      try {
        const response = await fetch(`https://my-office-web.onrender.com/favoritos/${salaId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorito(data.favoritado);
        }
      } catch (error) {
        console.error('Erro ao verificar favorito:', error);
      }
    };

    if (salaId) {
      verificarFavorito();
    }
  }, [salaId, token]);

  const handleAgendamentoSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const dataReserva = dataForm.get('data');

    if (!dataReserva) {
      alert('Por favor, selecione uma data para a reserva.');
      return;
    }

    setLoadingReserva(true);

    try {
      const response = await fetch('https://my-office-web.onrender.com/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          sala_id: salaId,
          data: dataReserva,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Reserva criada com sucesso!');
        setAgendamentoOpen(false);
      } else {
        toast.error('Erro: ' + (result.error || 'Não foi possível criar a reserva.'));
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
      console.error(error);
    } finally {
      setLoadingReserva(false);
    }
  };

  return (
    <Card sx={{
      maxWidth: 360,
      borderRadius: 3,
      boxShadow: 4,
      transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
    }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{titulo.charAt(0)}</Avatar>}
        title={<Typography variant="h6" noWrap>{titulo}</Typography>}
        subheader={
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" title={endereco}>
              {endereco}
            </Typography>
          </Box>
        }
      />
      <CardMedia
        component="img"
        height="180"
        image={imagemBase64}
        alt={titulo}
        sx={{ cursor: 'pointer', objectFit: 'cover' }}
        onClick={handleModalOpen}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Tooltip title="Preço por diária">
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon sx={{ color: 'success.main' }} />
              <Typography fontWeight={600}>R$ {preco}</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Capacidade">
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleAltIcon />
              <Typography fontWeight={600}>{capacidade} pessoas</Typography>
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
          onClick={handleToggleFavorito}
          color={favorito ? 'error' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="compartilhar" onClick={handleCompartilhar}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="whatsapp" onClick={handleWhatsAppClick}>
          <WhatsAppIcon />
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

      {/* Modal Detalhes */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{
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
        }}>
          <Typography variant="h5" mb={2}>{titulo}</Typography>
          <Box component="img" src={imagemBase64} alt={titulo} sx={{
            width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, mb: 2,
          }} />
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnIcon color="action" />
            <Typography>{endereco}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyIcon color="success" />
              <Typography fontWeight={600}>Preço: R$ {preco}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleAltIcon color="action" />
              <Typography fontWeight={600}>Capacidade: {capacidade} pessoas</Typography>
            </Box>
          </Box>
          <Typography color="text.secondary" paragraph>{descricao}</Typography>
          <Box textAlign="right">
            <Button variant="contained" onClick={() => setAgendamentoOpen(true)}
              sx={{
                bgcolor: '#FF5A00', color: 'white',
                '&:hover': { bgcolor: '#e64a00' },
                px: 3, py: 1.5, borderRadius: '999px', fontWeight: 'bold',
              }}>
              Reservar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Agendamento */}
      <Modal open={agendamentoOpen} onClose={() => setAgendamentoOpen(false)}>
        <Box component="form" onSubmit={handleAgendamentoSubmit} sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper',
          boxShadow: 24, p: 3, borderRadius: 2,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <Typography variant="h6" mb={2}>Reservar Sala</Typography>
          <TextField
            label="Data da reserva"
            name="data"
            type="date"
            fullWidth required
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />
          <Button type="submit" variant="contained" disabled={loadingReserva}
            sx={{
              bgcolor: '#FF5A00', color: 'white',
              '&:hover': { bgcolor: '#e64a00' },
              py: 1.5, fontWeight: 'bold',
            }}>
            {loadingReserva ? 'Enviando...' : 'Confirmar'}
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}
