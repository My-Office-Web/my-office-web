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
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import { useTheme } from '@mui/material/styles';

export default function ModalReservas({ open, onClose }) {
  const theme = useTheme();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novaData, setNovaData] = useState('');
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const formatarDataBrasileira = (dataStr) => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const buscarReservas = async () => {
    setLoading(true);
    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      const response = await axios.get('https://my-office-web.onrender.com/reservas', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservas(response.data);
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
        `https://my-office-web.onrender.com/reservas/${id}`,
        { data: novaData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Reserva atualizada com sucesso.');
      await buscarReservas();
      setEditandoId(null);
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      toast.error(error.response?.data?.error || 'Erro ao atualizar reserva.');
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!idParaExcluir) return;

    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      await axios.delete(`https://my-office-web.onrender.com/reservas/${idParaExcluir}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Reserva excluída com sucesso.');
      setReservas((prev) => prev.filter((r) => r.id !== idParaExcluir));

      if (editandoId === idParaExcluir) {
        setEditandoId(null);
        setNovaData('');
      }
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      toast.error(error.response?.data?.error || 'Erro ao excluir reserva.');
    } finally {
      setIdParaExcluir(null);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: theme.palette.background.paper },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            mb: 2,
            color: "#1976d3"
          }}
        >
          Minhas Reservas
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: theme.palette.background.paper }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : reservas.length === 0 ? (
            <Typography variant="body1" align="center" color="text.secondary">
              Nenhuma reserva encontrada.
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={3}>
              {reservas.map((reserva) => (
                <Card
                  key={reserva.id}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <Box
                    component="img"
                    src={reserva.sala_imagem}
                    alt={`Imagem da sala ${reserva.sala_tipo}`}
                    sx={{
                      width: 200,
                      height: 130,
                      objectFit: 'cover',
                      borderRadius: 2,
                      bgcolor: theme.palette.grey[300],
                    }}
                  />
                  <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Typography variant="h6" color="primary">
                        Sala em {reserva.bairro}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${reserva.rua}, ${reserva.numero} - ${reserva.bairro}, ${reserva.cidade} - ${reserva.estado}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capacidade: {reserva.capacidade} pessoas |{' '}
                        <strong>R$ {Number(reserva.preco).toFixed(2)}</strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {reserva.sala_descricao}
                      </Typography>

                      {editandoId === reserva.id ? (
                        <TextField
                          label="Data da Reserva"
                          type="date"
                          size="small"
                          value={novaData}
                          onChange={(e) => setNovaData(e.target.value)}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ min: new Date().toISOString().split('T')[0] }}
                          sx={{ mt: 1 }}
                        />
                      ) : (
                        <Chip
                          label={`Data: ${formatarDataBrasileira(reserva.data)}`}
                          color="primary"
                          variant="outlined"
                          sx={{ mt: 1, width: 'fit-content' }}
                        />
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
                          <IconButton
                            color="error"
                            onClick={() => setIdParaExcluir(reserva.id)}
                          >
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

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog
        open={Boolean(idParaExcluir)}
        onClose={() => setIdParaExcluir(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            maxWidth: 400,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: theme.palette.error.main,
            color: theme.palette.common.white,
            p: 1.5,
            borderRadius: '12px 12px 0 0',
          }}
        >
          <WarningAmberIcon fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Confirmação de Exclusão
          </Typography>
        </Box>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
            Tem certeza que deseja <strong>excluir</strong> esta reserva? Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setIdParaExcluir(null)}
            sx={{ borderRadius: 2, minWidth: 100 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmarExclusao}
            sx={{ borderRadius: 2, minWidth: 100 }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
