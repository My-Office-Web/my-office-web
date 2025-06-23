import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { toast } from "react-toastify";
import ValidarCadastroSala from "../../../../classes/ValidarInputsSala/validarCadastroSala";
import axios from "axios";
<<<<<<< HEAD
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";
=======
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao"; // ✅ NOVO: importação do serviço de autenticação
>>>>>>> Reservas-Salas

export default function ModalCadastroSala({ open, onClose }) {
  const [preview, setPreview] = useState(null);
  const [tipoSala, setTipoSala] = useState("");
  const [form, setForm] = useState({
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    telefone: "",
    preco: "",
    capacidade: "",
    descricao: "",
    imagem: "",
    latitude: "",
    longitude: "",
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const buscarCep = async () => {
    if (!form.cep || form.cep.length < 8) {
      toast.error("Informe um CEP válido.");
      return;
    }

    try {
      const cepSemMascara = form.cep.replace(/\D/g, "");
      const resp = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${cepSemMascara}`
      );

      setForm((prev) => ({
        ...prev,
        rua: resp.data.street || "",
        bairro: resp.data.neighborhood || "",
        cidade: resp.data.city || "",
        estado: resp.data.state || "",
        latitude: resp.data.location?.coordinates?.latitude || "",
        longitude: resp.data.location?.coordinates?.longitude || "",
      }));

      toast.success("Endereço preenchido com sucesso!");
    } catch (error) {
      toast.error("CEP não encontrado ou erro na consulta.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setPreview(base64);
      setForm({ ...form, imagem: base64 });
    }
  };

  const handleCancelar = () => {
    setForm({
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      telefone: "",
      preco: "",
      capacidade: "",
      descricao: "",
      imagem: "",
      latitude: "",
      longitude: "",
    });
    setTipoSala("");
    setPreview(null);
    onClose();
  };

  const handleSubmit = async () => {
    const dados = { ...form, tipo: tipoSala };
    const erros = ValidarCadastroSala.validarTodos(dados);

    if (Object.keys(erros).length > 0) {
      Object.values(erros).forEach((msg) => toast.error(msg));
      return;
    }

    try {
      const instanciaAutenticacao = new ServicoAutenticacao();
      const token = instanciaAutenticacao.obterToken();
      const USUARIO = instanciaAutenticacao.obterUsuario();
      console.log(USUARIO);

<<<<<<< HEAD
      await axios.post(
=======
      const response = await axios.post(
>>>>>>> Reservas-Salas
        "https://my-office-web.onrender.com/salas",
        {
          ...form,
          tipo: tipoSala,
          preco: parseFloat(form.preco),
          capacidade: parseInt(form.capacidade),
          usuario_id: USUARIO.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Sala cadastrada com sucesso!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
      handleCancelar();
    } catch (error) {
      toast.error("Erro ao cadastrar sala.");
      console.error(error);
    }
  };

  return (
<<<<<<< HEAD
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          mb: 2,
          color: "#1976d3",
          flexShrink: 0,
        }}
      >
        Cadastre sua Sala
=======
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Cadastro de Sala
>>>>>>> Reservas-Salas
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          overflowY: "auto",
          maxHeight: "calc(90vh - 130px)",
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          {[
            ["cep", "CEP"],
            ["estado", "Estado"],
            ["cidade", "Cidade"],
            ["bairro", "Bairro"],
            ["rua", "Rua"],
            ["numero", "Número"],
            ["preco", "Preço (Diária)"],
            ["capacidade", "Capacidade"],
          ].map(([name, label], i) => (
            <Grid item xs={12} sm={6} key={i}>
              <TextField
                name={name}
                label={label}
                fullWidth
                variant="outlined"
                size="medium"
                value={form[name]}
                onChange={handleChange}
                onBlur={name === "cep" ? buscarCep : undefined}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="tipo-label">Tipo de Sala</InputLabel>
              <Select
                sx={{ minWidth: 223 }}
                labelId="tipo-label"
                value={tipoSala}
                onChange={(e) => setTipoSala(e.target.value)}
                label="Tipo de Sala"
              >
                <MenuItem value="comercial">Comercial</MenuItem>
                <MenuItem value="corporativo">Corporativo</MenuItem>
                <MenuItem value="educacional">Educacional</MenuItem>
                <MenuItem value="residencial">Residencial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="descricao"
              label="Descrição"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={form.descricao}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              fullWidth
            >
              Importar Imagem
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {preview && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: 200,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  draggable={false}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "space-between", px: 3, py: 2, flexShrink: 0 }}
      >
        <Button onClick={handleCancelar} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
