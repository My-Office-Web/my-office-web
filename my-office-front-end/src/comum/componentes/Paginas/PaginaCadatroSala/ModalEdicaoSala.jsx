import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { toast } from "react-toastify";
import ValidarCadastroSala from "../../../../classes/ValidarInputsSala/validarCadastroSala";
import axios from "axios";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";

export default function ModalEdicaoSala({ open, onClose, sala }) {
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

  useEffect(() => {
    if (sala) {
      setForm({ ...sala });
      setTipoSala(sala.tipo || "");
      setPreview(sala.imagem || null);
    } else {
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
    }
  }, [sala]);

  console.log(sala.id_sala);
  

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const buscarCep = async () => {
    try {
      const cepSemMascara = form.cep.replace(/\D/g, "");
      if (cepSemMascara.length !== 8) {
        toast.error("Informe um CEP válido.");
        return;
      }

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

      toast.success("Endereço atualizado com sucesso!");
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
    onClose();
  };

  const handleSubmit = async () => {
    if (!sala || !sala.id_sala) {
      toast.error("Sala inválida para edição.");
      return;
    }

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

      await axios.put(
        `https://my-office-web.onrender.com/salas/${sala.id_sala}`,
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

      toast.success("Sala editada com sucesso!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Erro ao editar sala.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
        Edição de Sala
      </DialogTitle>
      <DialogContent dividers>
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
                value={form[name] || ""}
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
            <Typography variant="body1" fontWeight={500} gutterBottom>
              Imagem da Sala
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              fullWidth
            >
              Atualizar Imagem
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {preview && (
              <Box>
                <Typography variant="body2" mb={1}>
                  Preview da Imagem
                </Typography>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button onClick={handleCancelar} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ fontWeight: "bold" }}>
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
}
