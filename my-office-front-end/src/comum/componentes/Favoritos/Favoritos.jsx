import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Grid, CircularProgress
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import CardSala from "../CardSala/CardSala";

const servicoAutenticacao = new ServicoAutenticacao();

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

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

  useEffect(() => {
    if (open) {
      carregarFavoritos();
    }
  }, [open]);

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
