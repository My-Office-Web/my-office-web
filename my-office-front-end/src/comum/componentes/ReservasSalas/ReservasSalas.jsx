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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

export default function ModalReservas({ open, onClose }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarReservas = async () => {
    setLoading(true);
    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();

      const response = await axios.get('http://localhost:3000/reservas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservas(response.data);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      toast.error('Erro ao carregar reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      buscarReservas();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Reservas Realizadas</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        ) : reservas.length === 0 ? (
          <Typography variant="body1">Nenhuma reserva encontrada.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Tipo da Sala</TableCell>
                <TableCell>Descrição da Sala</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>{reserva.id}</TableCell>
                  <TableCell>{new Date(reserva.data).toLocaleDateString()}</TableCell>
                  <TableCell>{reserva.usuario_nome}</TableCell>
                  <TableCell>{reserva.sala_tipo}</TableCell>
                  <TableCell>{reserva.sala_descricao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
