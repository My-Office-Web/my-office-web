import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Avatar,
  ListItemText,
} from "@mui/material";
import { FaQuestionCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";

const SupportPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const textColor = isDark ? "#fff" : "#555";

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Descrição */}
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", color: textColor, textAlign: "justify" }}
      >
        A Central de Suporte da My Office está sempre disponível para resolver
        qualquer problema ou responder às suas dúvidas. Oferecemos atendimento
        personalizado para garantir que sua experiência seja sempre a melhor
        possível.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Seções: Como podemos ajudar */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          COMO PODEMOS AJUDAR?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "1.1rem", color: textColor, textAlign: "justify" }}
        >
          Escolha a categoria que melhor descreve o seu problema ou dúvida, e
          nossa equipe de suporte estará pronta para ajudar você da melhor forma
          possível.
        </Typography>
      </Box>

      {/* Categorias de Suporte */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              boxShadow: 4,
              bgcolor: isDark ? theme.palette.grey[900] : "white",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <FaQuestionCircle size={30} color="white" />
            </Avatar>
            <ListItemText
              primary="Dúvidas Frequentes"
              secondary="Consulte nossa seção de perguntas frequentes organizadas para resolver rapidamente sua dúvida ou demanda."
              primaryTypographyProps={{ style: { color: textColor, fontWeight: "bold" } }}
              secondaryTypographyProps={{ style: { color: textColor } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              boxShadow: 4,
              bgcolor: isDark ? theme.palette.grey[900] : "white",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <FaEnvelope size={30} color="white" />
            </Avatar>
            <ListItemText
              primary="Suporte por E-mail"
              secondary="Envie um e-mail detalhado sobre seu problema e nossa equipe especializada responderá o mais breve possível."
              primaryTypographyProps={{ style: { color: textColor, fontWeight: "bold" } }}
              secondaryTypographyProps={{ style: { color: textColor } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              boxShadow: 4,
              bgcolor: isDark ? theme.palette.grey[900] : "white",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <FaPhoneAlt size={30} color="white" />
            </Avatar>
            <ListItemText
              primary="Suporte por Telefone"
              secondary="Precisa de ajuda imediata? Entre em contato com nossa equipe de suporte técnico agora mesmo pelo telefone."
              primaryTypographyProps={{ style: { color: textColor, fontWeight: "bold" } }}
              secondaryTypographyProps={{ style: { color: textColor } }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Formulário de Contato */}
      <Box component="section" sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          FALE CONOSCO
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "1.1rem", color: textColor }}
        >
          Se você não encontrou o que procurava, envie-nos uma mensagem.
          Estamos aqui para ajudar.
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "& input, & textarea": {
              backgroundColor: isDark ? theme.palette.grey[900] : "white",
              color: textColor,
              border: "1px solid",
              borderColor: isDark ? theme.palette.grey[700] : "#ddd",
              borderRadius: 2,
              padding: "10px",
              fontSize: "1rem",
            },
            "& input::placeholder, & textarea::placeholder": {
              color: isDark ? theme.palette.grey[500] : "#999",
            },
          }}
        >
          <input type="text" placeholder="Seu nome" />
          <input type="email" placeholder="Seu e-mail" />
          <textarea placeholder="Sua mensagem" rows={5} />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Informações de Contato */}
      <Box component="section">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Informações de Contato
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "1.1rem", color: textColor }}
        >
          Entre em contato conosco pelos seguintes meios:
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", color: textColor }}>
          <strong>E-mail:</strong> suporte@myoffice.com
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", color: textColor }}>
          <strong>Telefone:</strong> (11) 1234-5678
        </Typography>
      </Box>
    </Container>
  );
};

export default SupportPage;
