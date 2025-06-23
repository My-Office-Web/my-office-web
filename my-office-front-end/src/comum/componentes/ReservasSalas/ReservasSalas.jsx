import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Card,
  CardActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

export default function ModalReservas({ open, onClose }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novaData, setNovaData] = useState('');

  const buscarReservas = async () => {
    setLoading(true);
    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      const response = await axios.get('http://localhost:3000/reservas', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservas(response.data);
      toast.success('Reservas carregadas com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      toast.error(error.response?.data?.error || 'Erro ao carregar reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      buscarReservas();
      setEditandoId(null);
    }
  }, [open]);

  const handleEditarClick = (id, dataAtual) => {
    setEditandoId(id);
    setNovaData(new Date(dataAtual).toISOString().split('T')[0]);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setNovaData('');
    toast.info('Edição cancelada.');
  };

  const handleSalvarEdicao = async (id) => {
    if (!novaData) {
      toast.warn('Por favor, selecione uma data válida.');
      return;
    }

    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      await axios.put(
        `http://localhost:3000/reservas/${id}`,
        { data: novaData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Reserva atualizada com sucesso.');
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, data: novaData } : r))
      );
      setEditandoId(null);
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      const mensagem = error.response?.data?.error || 'Erro ao atualizar reserva.';
      toast.error(mensagem);
    }
  };

  const handleExcluirReserva = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) {
      toast.info('Exclusão cancelada.');
      return;
    }

    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      await axios.delete(`http://localhost:3000/reservas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Reserva excluída com sucesso.');
      setReservas((prev) => prev.filter((r) => r.id !== id));

      if (editandoId === id) {
        setEditandoId(null);
        setNovaData('');
      }
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      const mensagem = error.response?.data?.error || 'Erro ao excluir reserva.';
      toast.error(mensagem);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Minhas Reservas</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        ) : reservas.length === 0 ? (
          <Typography variant="body1">Nenhuma reserva encontrada.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {reservas.map((reserva) => (
              <Card key={reserva.id} variant="outlined" sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Box
                  component="img"
                  src={reserva.sala_imagem}
                  alt={`Imagem da sala ${reserva.sala_tipo}`}
                  sx={{
                    width: 180,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 2,
                    bgcolor: '#f0f0f0',
                  }}
                />
                <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">{reserva.sala_tipo}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${reserva.rua}, ${reserva.numero} - ${reserva.bairro}, ${reserva.cidade} - ${reserva.estado}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Capacidade: {reserva.capacidade} pessoas | R$ {Number(reserva.preco).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {reserva.sala_descricao}
                    </Typography>

                    {editandoId === reserva.id ? (
                      <TextField
                        label="Data da Reserva"
                        type="date"
                        value={novaData}
                        onChange={(e) => setNovaData(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Typography sx={{ mt: 1 }}>
                        Data: {new Date(reserva.data).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>

                  <CardActions sx={{ p: 0, pt: 1 }}>
                    {editandoId === reserva.id ? (
                      <>
                        <IconButton color="primary" onClick={() => handleSalvarEdicao(reserva.id)}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelarEdicao}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditarClick(reserva.id, reserva.data)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleExcluirReserva(reserva.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </CardActions>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
