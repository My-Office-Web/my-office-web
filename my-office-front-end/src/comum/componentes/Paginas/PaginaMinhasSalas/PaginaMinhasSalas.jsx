import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardActions,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalEdicaoSala from "../PaginaCadatroSala/ModalEdicaoSala";
import ModalConfirmacaoExclusao from "../PaginaCadatroSala/ModalConfirmacaoExclusao/ModalConfirmacaoExclusao";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SalasContext } from "../../SalasContext/SalasContext";
import { useTheme } from "@mui/material/styles"; // << usa o tema

export default function ModalMinhasSalas({ open, onClose }) {
  const theme = useTheme(); // << hook para acessar o tema
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [salaExcluir, setSalaExcluir] = useState(null);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [loadingSalas, setLoadingSalas] = useState(false);

  const autenticacao = new ServicoAutenticacao();
  const usuarioLogado = autenticacao.obterUsuario();

  const { salas, refreshSalas } = useContext(SalasContext);
  const [minhasSalas, setMinhasSalas] = useState([]);

  useEffect(() => {
    if (open && usuarioLogado) {
      setLoadingSalas(true);
      const salasUsuario = salas.filter((sala) => sala.usuario_id === usuarioLogado.id);
      setMinhasSalas(salasUsuario);
      setLoadingSalas(false);
    }
  }, [open, salas, usuarioLogado]);

  const handleEditarSala = (sala) => {
    setSalaSelecionada(sala);
    setModalEditarAberto(true);
  };

  const handleFecharModalEdicao = () => {
    setModalEditarAberto(false);
    setSalaSelecionada(null);
  };

  const handleAbrirModalExcluir = (sala) => {
    setSalaExcluir(sala);
    setModalExcluirAberto(true);
  };

  const handleFecharModalExcluir = () => {
    if (loadingExcluir) return;
    setModalExcluirAberto(false);
    setSalaExcluir(null);
  };

  const handleConfirmarExclusao = async () => {
    setLoadingExcluir(true);
    try {
      const token = autenticacao.obterToken();
      await axios.delete(`https://my-office-web.onrender.com/salas/${salaExcluir.id_sala}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Sala excluída com sucesso!");
      handleFecharModalExcluir();
      await refreshSalas();
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      toast.error("Não foi possível excluir a sala. Tente novamente.");
    } finally {
      setLoadingExcluir(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            mb: 2,
            color: "#1976d3"
          }}
        >
          Minhas Salas
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {loadingSalas ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : minhasSalas.length === 0 ? (
            <Typography variant="body1" align="center" color="text.secondary">
              Nenhuma sala cadastrada ainda.
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={3}>
              {minhasSalas.map((sala) => (
                <Card
                  key={sala.id_sala}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <Box
                    component="img"
                    src={sala.imagem}
                    alt={`Imagem da sala ${sala.tipo}`}
                    sx={{
                      width: 200,
                      height: 130,
                      objectFit: "cover",
                      borderRadius: 2,
                      bgcolor: theme.palette.grey[300],
                    }}
                  />
                  <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Typography variant="h6" color="primary">
                        Sala em {sala.bairro}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${sala.cidade} - ${sala.estado}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capacidade: {sala.capacidade} pessoas |{" "}
                        <strong>R$ {Number(sala.preco).toFixed(2)}</strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {sala.descricao}
                      </Typography>
                    </Box>

                    <CardActions sx={{ p: 0, pt: 1 }}>
                      <IconButton color="primary" onClick={() => handleEditarSala(sala)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleAbrirModalExcluir(sala)}>
                        <FaTrash />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {salaSelecionada && (
        <ModalEdicaoSala open={modalEditarAberto} onClose={handleFecharModalEdicao} sala={salaSelecionada} />
      )}

      {salaExcluir && (
        <ModalConfirmacaoExclusao
          open={modalExcluirAberto}
          onClose={handleFecharModalExcluir}
          onConfirm={handleConfirmarExclusao}
          salaId={salaExcluir.id_sala}
          loading={loadingExcluir}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
