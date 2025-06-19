import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalEdicaoSala from "../PaginaCadatroSala/ModalEdicaoSala";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";

export default function ModalMinhasSalas({ open, onClose }) {
  const [salas, setSalas] = useState([]);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);

  const autenticacao = new ServicoAutenticacao();
  const usuarioLogado = autenticacao.obterUsuario();

  useEffect(() => {
    if (open) {
      fetchSalasDoUsuario();
    }
  }, [open]);

  const fetchSalasDoUsuario = async () => {
    try {
      const response = await axios.get("https://my-office-web.onrender.com/salas");

      // Filtra somente as salas que pertencem ao usuário logado
      const minhasSalas = response.data.filter(
        (sala) => sala.usuario_id === usuarioLogado?.id
      );

      setSalas(minhasSalas);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  };

  const handleEditarSala = (sala) => {
    setSalaSelecionada(sala);
    setModalEditarAberto(true);
  };

  const handleFecharModalEdicao = () => {
    setModalEditarAberto(false);
    setSalaSelecionada(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            mb: 2,
            color: "#1976d3",
          }}
        >
          Minhas Salas
        </DialogTitle>
        <DialogContent dividers>
          {salas.length === 0 ? (
            <Typography variant="body1" align="center">
              Nenhuma sala cadastrada ainda.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {salas.map((sala, index) => (
                <Grid item xs={12} sm={6} key={index}>
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
                      image={sala.imagem}
                      alt={`Imagem da sala ${sala.tipo}`}
                      sx={{
                        width: 400,
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold" color="grey">
                        Sala {sala.id}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                          onClick={() => handleEditarSala(sala)}
                        >
                          <FaEdit style={{ marginRight: 4, color: "#1976d3" }} />
                          <Typography variant="body2">Editar Sala</Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                          // onClick={() => handleExcluirSala(sala.id)} // Você pode implementar depois
                        >
                          <FaTrash style={{ marginRight: 4, color: "red" }} />
                          <Typography variant="body2">Excluir Sala</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
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

      {/* Modal de Edição */}
      {salaSelecionada && (
        <ModalEdicaoSala
          open={modalEditarAberto}
          onClose={handleFecharModalEdicao}
          sala={salaSelecionada}
        />
      )}
    </>
  );
}
