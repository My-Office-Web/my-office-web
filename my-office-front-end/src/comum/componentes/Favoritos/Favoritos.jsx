import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";

import { toast } from "react-toastify";

const servicoAutenticacao = new ServicoAutenticacao();

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const token = servicoAutenticacao.obterToken();

  const carregarFavoritos = () => {
    if (!token) return;
    setCarregando(true);

    axios
      .get("http://localhost:3000/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavoritos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar favoritos", err);
        toast.error("Erro ao carregar favoritos.");
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    if (open) {
      carregarFavoritos();
    }
  }, [open]);

  const removerFavorito = (sala_id) => {
    if (!token) return;

    axios
      .delete("http://localhost:3000/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
        data: { sala_id },
      })
      .then(() => {
        setFavoritos((prev) => prev.filter((fav) => fav.id !== sala_id));
        toast.success("Sala removida dos favoritos.");
      })
      .catch((err) => {
        console.error("Erro ao remover favorito", err);
        toast.error("Erro ao remover favorito.");
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ fontWeight: "bold" }}>Salas Favoritas</DialogTitle>
      <DialogContent dividers>
        {carregando ? (
          <CircularProgress />
        ) : favoritos.length === 0 ? (
          <Typography>Você ainda não tem salas favoritas.</Typography>
        ) : (
          <Grid container spacing={3}>
            {favoritos.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id}>
                <Card
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={fav.imagem}
                    alt={fav.tipo}
                  />
                  <CardContent>
                    <Typography variant="h6">{fav.tipo}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fav.rua}, {fav.numero} - {fav.bairro}, {fav.cidade} - {fav.estado}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      R$ {fav.preco} | Capacidade: {fav.capacidade}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="error"
                      onClick={() => removerFavorito(fav.id)}
                      aria-label="Remover favorito"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFavoritos;
