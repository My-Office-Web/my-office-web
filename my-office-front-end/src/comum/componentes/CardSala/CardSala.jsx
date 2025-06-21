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
  Box,
  Tooltip,
  Modal,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function CardSala({
  usuarioId,
  salaId,
  titulo = 'Sala Corporativa Premium',
  endereco = 'Av. Paulista, 1000 - São Paulo, SP',
  imagemBase64,
  descricao = 'Espaço moderno e equipado para reuniões, treinamentos e workshops.',
  preco = '250',
  capacidade = '20',
  cidade,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [agendamentoOpen, setAgendamentoOpen] = React.useState(false);
  const [loadingReserva, setLoadingReserva] = React.useState(false);
  const [favorito, setFavorito] = React.useState(false);

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
      alert('O compartilhamento não é suportado neste navegador.');
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
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ sala_id: salaId }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar favorito');
      setFavorito(!favorito);
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar:', error);
      alert('Não foi possível atualizar o favorito.');
    }
  };

  const handleAgendamentoSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const reserva = {
      usuario_id: usuarioId,
      sala_id: salaId,
      data: dataForm.get('data'),
    };

    if (!reserva.data) {
      alert('Por favor, selecione uma data para a reserva.');
      return;
    }

    setLoadingReserva(true);

    try {
      const response = await fetch('https://my-office-web.onrender.com/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(reserva),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Reserva criada com sucesso! ID: ' + result.reservaId);
        setAgendamentoOpen(false);
      } else {
        alert('Erro: ' + (result.error || 'Não foi possível criar a reserva.'));
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    } finally {
      setLoadingReserva(false);
    }
  };

  return (
    <Card sx={{ width: 400, height: 440, borderRadius: 3, boxShadow: 4 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>S</Avatar>}
        title={<Typography variant="h6" noWrap>{titulo}</Typography>}
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
              <Typography fontWeight={600}>{preco}</Typography>
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
      <CardActions sx={{ height: 3, px: 1, justifyContent: 'space-around' }}>
        <IconButton aria-label="favoritar" onClick={handleToggleFavorito} color={favorito ? 'error' : 'default'}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="compartilhar" onClick={handleCompartilhar}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="whatsapp" onClick={handleWhatsAppClick}>
          <WhatsAppIcon />
        </IconButton>
      </CardActions>

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
          <Typography variant="h5" mb={2}>{titulo}</Typography>
          <Box
            component="img"
            src={imagemBase64}
            alt={`Imagem detalhada da ${titulo}`}
            sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, mb: 2 }}
          />
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
            <Button
              variant="contained"
              onClick={() => setAgendamentoOpen(true)}
              sx={{
                bgcolor: '#FF5A00',
                color: 'white',
                '&:hover': { bgcolor: '#e64a00' },
                px: 3,
                py: 1.5,
                borderRadius: '999px',
                fontWeight: 'bold',
              }}
            >
              Agendar
            </Button>
          </Box>
        </Box>
      </Modal>

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
          <TextField
            label="Data do agendamento"
            name="data"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loadingReserva}
            sx={{
              bgcolor: '#FF5A00',
              color: 'white',
              '&:hover': { bgcolor: '#e64a00' },
              py: 1.5,
              fontWeight: 'bold',
            }}
            aria-busy={loadingReserva}
          >
            {loadingReserva ? 'Enviando...' : 'Confirmar'}
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}
