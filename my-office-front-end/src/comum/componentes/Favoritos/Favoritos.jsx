import React, { useEffect, useState, useContext } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Grid, CircularProgress, Box
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import CardSala from "../CardSala/CardSala";

import { SalasContext } from "../SalasContext/SalasContext";

const servicoAutenticacao = new ServicoAutenticacao();

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const token = servicoAutenticacao.obterToken();

  
  const { refreshSalas } = useContext(SalasContext);

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

  // Função para ser chamada quando o favorito for alterado
  const handleFavoritoAlterado = () => {
    carregarFavoritos();
    refreshSalas();  // atualiza a lista global de salas
  };

  return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.5rem",
      mb: 2,
      color: "#1976d3",
    }}
  >
    Salas Favoritas
  </DialogTitle>

  <DialogContent dividers>
    {carregando ? (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    ) : favoritos.length === 0 ? (
      <Typography variant="body1" align="center">
        Você ainda não tem salas favoritas.
      </Typography>
    ) : (
      <Grid container spacing={4} justifyContent="center">
        {favoritos.map((fav) => (
          <Grid item xs={12} sm={6} md={4} key={fav.id}>
            <CardSala
              usuarioId={fav.usuario_id}
              salaId={fav.id}
              titulo={`Sala em ${fav.bairro}`}
              endereco={`${fav.cidade}/${fav.estado}`}
              imagemBase64={fav.imagem}
              descricao={fav.descricao}
              preco={fav.preco}
              capacidade={fav.capacidade}
              onFavoritoAlterado={handleFavoritoAlterado}
            />
          </Grid>
        ))}
      </Grid>
    )}
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
    <Button onClick={onClose} variant="contained" color="primary">
      Fechar
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default ModalFavoritos;
