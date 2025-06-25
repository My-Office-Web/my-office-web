import React from 'react';
import { Modal, Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const estiloBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  outline: 'none',
};

const AjudaModal = ({ open, onClose }) => {
  const carregando = false;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={estiloBox}>
        {/* Cabeçalho com botão de fechar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Central de Ajuda
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Conteúdo */}
        {carregando ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="body1" mt={2}>
              Bem-vindo à Central de Ajuda do MyOffice!
            </Typography>

            <Typography fontWeight="bold" mt={2}>Como Agendar uma Sala:</Typography>
            <Typography>
              1. Use a busca e filtros para encontrar a sala ideal.
              <br />
              2. Clique no card da sala.
              <br />
              3. Escolha data e horário.
              <br />
              4. Confirme a reserva.
            </Typography>

            <Typography fontWeight="bold" mt={2}>Minhas Salas Favoritas:</Typography>
            <Typography>
              Clique no coração para favoritar. Acesse pelo menu superior.
            </Typography>

            <Typography fontWeight="bold" mt={2}>Gerenciamento de Conta:</Typography>
            <Typography>
              No seu perfil, atualize dados e veja reservas.
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={3}>
              Para mais informações ou suporte, entre em contato.
            </Typography>

            {/* Botão de fechar */}
            <Box textAlign="right" mt={3}>
              <Button onClick={onClose} variant="contained">Entendi</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AjudaModal;
