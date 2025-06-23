import * as React from 'react';
import {
<<<<<<< HEAD
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Modal,
  Divider,
  Button,
  TextField,
=======
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, IconButton, Typography, styled, Box, Tooltip,
  Modal, Divider, Button, TextField
>>>>>>> Reservas-Salas
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { toast } from 'react-toastify';

<<<<<<< HEAD
=======
const ExpandMore = styled(({ expand, ...other }) => (
  <IconButton {...other} />
))(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

>>>>>>> Reservas-Salas
export default function CardSala({
  usuarioId,
  salaId,
  titulo,
  endereco,
  imagemBase64,
<<<<<<< HEAD
  descricao = 'Espaço moderno e equipado para reuniões, treinamentos e workshops.',
  preco = '250',
  capacidade = '20',
  cidade,
=======
  descricao,
  preco,
  capacidade,
  onFavoritoAlterado
>>>>>>> Reservas-Salas
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [agendamentoOpen, setAgendamentoOpen] = React.useState(false);
  const [loadingReserva, setLoadingReserva] = React.useState(false);
  const [favorito, setFavorito] = React.useState(false);

<<<<<<< HEAD
  React.useEffect(() => {
    const verificarFavorito = async () => {
      try {
        const response = await fetch(`https://my-office-web.onrender.com/favoritos/${salaId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) setFavorito(data.favoritado);
      } catch (error) {
        console.error('Erro ao verificar favorito:', error);
      }
    };
    if (salaId) verificarFavorito();
  }, [salaId]);

=======
  const token = localStorage.getItem('auth-token');

  const handleExpandClick = () => setExpanded(!expanded);
>>>>>>> Reservas-Salas
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

      if (!response.ok) throw new Error('Erro ao atualizar favorito');
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

<<<<<<< HEAD
  const handleAgendamentoSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const reserva = {
      usuario_id: usuarioId,
      sala_id: salaId,
      data: dataForm.get('data'),
    };

    if (!reserva.data) {
=======
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
>>>>>>> Reservas-Salas
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
        toast.success('Reserva criada com sucesso! ID: ' + result.reservaId);
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
<<<<<<< HEAD
    <Card sx={{ width: 400, height: 440, borderRadius: 3, boxShadow: 4 }}>
=======
    <Card sx={{
      maxWidth: 360,
      borderRadius: 3,
      boxShadow: 4,
      transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
    }}>
>>>>>>> Reservas-Salas
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{titulo.charAt(0)}</Avatar>}
        title={<Typography variant="h6" noWrap>{titulo}</Typography>}
<<<<<<< HEAD
 subheader={
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" gap={0.5}>
        <LocationOnIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary" title={endereco}>
          {endereco}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ pl: 3 }}>
        {cidade}
      </Typography>
    </Box>
  }
/>

=======
        subheader={
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" title={endereco}>
              {endereco}
            </Typography>
          </Box>
        }
      />
>>>>>>> Reservas-Salas
      <CardMedia
        component="img"
        height="200"
        image={imagemBase64}
        alt={titulo}
        sx={{ objectFit: 'cover', cursor: 'pointer' }}
        onClick={handleModalOpen}
      />
      <CardContent sx={{ height: 110, overflow: 'hidden' }}>
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
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {descricao}
        </Typography>
      </CardContent>
<<<<<<< HEAD
      <CardActions sx={{ height: 3, px: 1, justifyContent: 'space-around' }}>
        <IconButton aria-label="favoritar" onClick={handleToggleFavorito} color={favorito ? 'error' : 'default'}>
=======
      <CardActions disableSpacing>
        <IconButton
          aria-label="favoritar"
          onClick={handleToggleFavorito}
          color={favorito ? 'error' : 'default'}
        >
>>>>>>> Reservas-Salas
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="compartilhar" onClick={handleCompartilhar}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="whatsapp" onClick={handleWhatsAppClick}>
          <WhatsAppIcon />
        </IconButton>
      </CardActions>

<<<<<<< HEAD
      {/* Modal de detalhes da sala */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90vw', sm: 600 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: 'none',
          }}
        >
=======
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
>>>>>>> Reservas-Salas
          <Typography variant="h5" mb={2}>{titulo}</Typography>
          <Box component="img" src={imagemBase64} alt={titulo} sx={{
            width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, mb: 2,
          }} />
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOnIcon color="action" />
            <Typography>{endereco} - {cidade}</Typography>
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

<<<<<<< HEAD
      {/* Modal de agendamento */}
      <Modal open={agendamentoOpen} onClose={() => setAgendamentoOpen(false)}>
        <Box
          component="form"
          onSubmit={handleAgendamentoSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" mb={2}>Agendar Sala</Typography>
          <TextField label="Usuário ID" value={`Usuário ID: ${usuarioId}`} disabled fullWidth />
=======
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
>>>>>>> Reservas-Salas
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
