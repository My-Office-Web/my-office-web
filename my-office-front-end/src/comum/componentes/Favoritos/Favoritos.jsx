import React, { useEffect, useState } from "react";
import {
<<<<<<< HEAD
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
=======
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Grid, CircularProgress
} from "@mui/material";
>>>>>>> Reservas-Salas
import axios from "axios";
import { toast } from "react-toastify";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import CardSala from "../CardSala/CardSala";

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

<<<<<<< HEAD
  const autenticacao = new ServicoAutenticacao();
  const token = autenticacao.obterToken();
=======
  const token = servicoAutenticacao.obterToken();

  const carregarFavoritos = () => {
    if (!token) return;
    setCarregando(true);

    axios.get("https://my-office-web.onrender.com/favoritos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setFavoritos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar favoritos", err);
        toast.error("Erro ao carregar favoritos.");
      })
      .finally(() => setCarregando(false));
  };
>>>>>>> Reservas-Salas

  useEffect(() => {
    if (open) carregarFavoritos();
  }, [open]);

<<<<<<< HEAD
  const carregarFavoritos = async () => {
    if (!token) return;
    setCarregando(true);
    try {
      const res = await axios.get("https://my-office-web.onrender.com/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoritos(res.data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    } finally {
      setCarregando(false);
    }
  };

  const removerFavorito = async (sala_id) => {
    try {
      await axios.delete("https://my-office-web.onrender.com/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
        data: { sala_id },
      });
      setFavoritos((prev) => prev.filter((fav) => fav.id_sala !== sala_id));
    } catch (err) {
      console.error("Erro ao remover favorito", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          mb: 2,
          color: "#1976d3",
        }}
      >
        Minhas Salas Favoritas
      </DialogTitle>

=======
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ fontWeight: "bold" }}>Salas Favoritas</DialogTitle>
>>>>>>> Reservas-Salas
      <DialogContent dividers>
        {carregando ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : favoritos.length === 0 ? (
          <Typography variant="body1" align="center">
            Você ainda não tem salas favoritas.
          </Typography>
        ) : (
<<<<<<< HEAD
          <Grid container spacing={4} justifyContent="center">
            {favoritos.map((fav, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={fav.imagem}
                    alt={`Imagem da sala ${fav.tipo}`}
                    sx={{
                      width: 400,
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" color="grey">
                      Sala {fav.id_sala}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fav.bairro} - {fav.cidade}/{fav.estado}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      R$ {fav.preco}
                    </Typography>
                  </CardContent>
                  <Box sx={{ textAlign: "center", pb: 2 }}>
                    <IconButton color="error" onClick={() => removerFavorito(fav.id_sala)}>
                      <FaTrash />
                    </IconButton>
                  </Box>
                </Card>
=======
          <Grid container spacing={3}>
            {favoritos.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id}>
                <CardSala
                  usuarioId={fav.usuario_id}
                  salaId={fav.id}
                  titulo={fav.tipo}
                  endereco={`${fav.rua}, ${fav.numero} - ${fav.bairro}, ${fav.cidade} - ${fav.estado}`}
                  imagemBase64={fav.imagem}
                  descricao={fav.descricao}
                  preco={fav.preco}
                  capacidade={fav.capacidade}
                  onFavoritoAlterado={carregarFavoritos} // 🔥 Atualiza quando desfavorita
                />
>>>>>>> Reservas-Salas
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
<<<<<<< HEAD

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
=======
      <DialogActions>
        <Button onClick={onClose} variant="contained">
>>>>>>> Reservas-Salas
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFavoritos;