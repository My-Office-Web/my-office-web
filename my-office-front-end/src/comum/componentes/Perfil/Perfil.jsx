import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao";

const servicoAutenticacao = new ServicoAutenticacao();

const PaginaPerfilUsuario = ({ open, onClose }) => {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (open) {
      const usuarioLogado = servicoAutenticacao.obterUsuario();
      if (usuarioLogado) {
        const avatarUrl =
          usuarioLogado.avatarUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            usuarioLogado.nome || "U"
          )}&background=random`;

        const dadosUsuario = {
          nome: usuarioLogado.nome || "",
          email: usuarioLogado.email || "",
          avatarUrl,
        };

        setUser(dadosUsuario);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold" }}>Perfil do Usuário</DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mb={3}
        >
          <Avatar
            src={user.avatarUrl}
            alt={user.nome}
            sx={{ width: 120, height: 120, mb: 1, boxShadow: 4 }}
          />
          <Typography variant="h6" textAlign="center">
            {user.nome || "Usuário"}
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={user.nome}
              disabled
              InputProps={{
                sx: { color: "text.disabled", backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              label="Email"
              name="email"
              value={user.email}
              disabled
              sx={{ width: 600 }}
              InputProps={{
                sx: { color: "text.disabled", backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose} startIcon={<CloseIcon />}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaginaPerfilUsuario;
