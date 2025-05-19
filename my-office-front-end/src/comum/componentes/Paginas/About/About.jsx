import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  Divider,
  ListItemText,
} from "@mui/material";
import { FaLightbulb, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

const PaginaAbout = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
        A My Office é uma plataforma inovadora que oferece soluções flexíveis para reservas de espaços de trabalho,
        salas de reunião e eventos corporativos. Nossa missão é transformar a maneira como profissionais e empresas
        encontram e utilizam espaços para suas necessidades, proporcionando conveniência, eficiência e qualidade.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Missão
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
          Nossa missão é proporcionar aos nossos clientes um ambiente profissional de alto padrão, com facilidade de
          acesso e recursos modernos para otimizar suas reuniões, eventos e atividades corporativas. Estamos
          comprometidos em oferecer um serviço de excelência, garantindo que cada experiência com a My Office seja
          única e produtiva.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Visão
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
          Nossa visão é ser reconhecida como a plataforma líder em soluções de espaços de trabalho flexíveis e
          serviços corporativos, sendo a escolha preferencial de profissionais e empresas ao redor do mundo, por
          meio da inovação e da qualidade em nossos serviços.
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Valores
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", alignItems: "center", boxShadow: 4 }}>
              <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                <FaLightbulb size={30} color="white" />
              </Avatar>
              <ListItemText
                primary="Inovação"
                secondary="Buscamos sempre a inovação para oferecer soluções que atendam às necessidades do mercado."
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", alignItems: "center", boxShadow: 4 }}>
              <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                <FaCheckCircle size={30} color="white" />
              </Avatar>
              <ListItemText
                primary="Qualidade"
                secondary="Garantimos qualidade em todos os aspectos dos nossos serviços, desde o atendimento até os espaços oferecidos."
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", alignItems: "center", boxShadow: 4 }}>
              <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                <FaSyncAlt size={30} color="white" />
              </Avatar>
              <ListItemText
                primary="Flexibilidade"
                secondary="Entendemos as demandas do mundo corporativo e oferecemos flexibilidade em nossos serviços para atender cada cliente da melhor maneira possível."
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Equipe
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
          Nossa equipe é formada por profissionais experientes e dedicados, que trabalham com paixão para entregar a
          melhor experiência para nossos usuários. Desde a gestão da plataforma até o atendimento ao cliente, cada
          membro da My Office está focado em proporcionar soluções eficazes e de alta qualidade.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Por que escolher a My Office?
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", color: "#555" }}>
        Se você está buscando flexibilidade, qualidade e inovação, a My Office é a escolha certa para o seu negócio.
        Nossa plataforma oferece uma gama de opções que se adaptam às necessidades de profissionais e empresas de
        diferentes portes e setores, com um foco constante em excelência e eficiência.
      </Typography>
    </Container>
  );
};

export default PaginaAbout;
