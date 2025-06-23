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
  Grid,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";
import axios from "axios";

const ModalFavoritos = ({ open, onClose }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const autenticacao = new ServicoAutenticacao();
  const token = autenticacao.obterToken();

  useEffect(() => {
    if (open) carregarFavoritos();
  }, [open]);

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", color: "#1976d3" }}>
        Minhas Salas Favoritas
      </DialogTitle>
      <DialogContent dividers>
        {carregando ? (
          <CircularProgress />
        ) : favoritos.length === 0 ? (
          <Typography variant="body1" align="center">
            Você ainda não tem salas favoritas.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {favoritos.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id_sala}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={fav.imagem}
                    alt={`Imagem da sala ${fav.tipo}`}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">
                      {fav.tipo}
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
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFavoritos;