import React, { useEffect, useState, useContext } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Grid, CircularProgress
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
                  onFavoritoAlterado={handleFavoritoAlterado} // chama a função que atualiza tudo
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
