import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import axios from "axios";

const servicoAutenticacao = new ServicoAutenticacao();

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Pega token e usuário para autenticação
  const usuario = servicoAutenticacao.obterUsuario();
  const token = servicoAutenticacao.obterToken();

  // Função para buscar favoritos com dados das salas
  const carregarFavoritos = () => {
    if (!token) return;

    setCarregando(true);

    axios
      .get("http://localhost:3000/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavoritos(res.data))
      .catch((err) => console.error("Erro ao buscar favoritos", err))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    if (open) {
      carregarFavoritos();
    }
  }, [open]);

  // Função para remover favorito pelo id da sala
  const removerFavorito = (sala_id) => {
    if (!token) return;

    axios
      .delete("http://localhost:3000/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
        data: { sala_id }, // corpo da requisição DELETE
      })
      .then(() => {
        setFavoritos((prev) => prev.filter((fav) => fav.id !== sala_id));
      })
      .catch((err) => console.error("Erro ao remover favorito", err));
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
                      {fav.cidade} - {fav.estado}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      R$ {fav.preco}
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
