import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Modal,
  Box,
  Typography
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Help as HelpIcon,
  MeetingRoom as MeetingRoomIcon,
  AddBusiness as AddBusinessIcon,
  Search as SearchIcon,
  Email as EmailIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import TemporaryDrawer from "../PaginaInicial/MenuLateral";
import ModalCadastroSala from "../PaginaCadatroSala/PaginaCadastroSala";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";

const instanciaAutenticacao = new ServicoAutenticacao();

export default function AppBarLogado() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModalCadastroSala, setOpenModalCadastroSala] = useState(false);
  const [openAjuda, setOpenAjuda] = useState(false);

  const navigate = useNavigate();
  const userName = "João Silva";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Handlers
  const toggleDrawer = (open) => () => setOpenDrawer(open);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => {
    instanciaAutenticacao.logout();
    window.location.reload();
  };

  const handleOpenAjuda = () => setOpenAjuda(true);
  const handleCloseAjuda = () => setOpenAjuda(false);

  // Dados de ajuda
  const ajudaItens = [
    {
      icon: <HomeIcon sx={{ color: "#1976d2", mr: 1 }} />,
      title: "Cadastrar uma sala",
      description: 'Clique em "Cadastrar Sala" para adicionar uma nova.',
    },
    {
      icon: <SearchIcon sx={{ color: "#1976d2", mr: 1 }} />,
      title: "Buscar salas",
      description: "Use a busca para encontrar salas por cidade.",
    },
    {
      icon: <FavoriteIcon sx={{ color: "#1976d2", mr: 1 }} />,
      title: "Favoritar salas",
      description: "Clique no ícone ❤️ para salvar suas salas favoritas.",
    },
    {
      icon: <EmailIcon sx={{ color: "#1976d2", mr: 1 }} />,
      title: "Suporte",
      description: (
        <>
          Se precisar de ajuda, envie um e-mail para{" "}
          <a href="mailto:suporte@myoffice.com" style={{ color: "#1976d2" }}>
            suporte@myoffice.com
          </a>.
        </>
      ),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo e Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              MyOffice
            </Typography>
          </Box>

          {/* Ícones centrais */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
            <IconeNav icone={<HomeIcon />} texto="Início" onClick={() => navigate("/novo")} />
            <IconeNav icone={<AddBusinessIcon />} texto="Cadastrar Sala" onClick={() => setOpenModalCadastroSala(true)} />
            <IconeNav icone={<MeetingRoomIcon />} texto="Minhas Salas" />
            <IconeNav icone={<FavoriteIcon />} texto="Favoritos" />
            <IconeNav icone={<HelpIcon />} texto="Ajuda" onClick={handleOpenAjuda} />
          </Box>

          {/* Avatar */}
          <Box>
            <Tooltip title="Abrir menu do usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "silver" }}>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* Modal Cadastro */}
      <ModalCadastroSala
        open={openModalCadastroSala}
        onClose={() => setOpenModalCadastroSala(false)}
      />

      {/* Modal de Ajuda */}
      <Modal open={openAjuda} onClose={handleCloseAjuda}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}>
            COMO PODEMOS AJUDAR VOCÊ?
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Encontre abaixo informações rápidas para navegar pela nossa plataforma:
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {ajudaItens.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  bgcolor: "#f9f9f9",
                  borderRadius: 2,
                  p: 2,
                  boxShadow: 1,
                }}
              >
                {icon}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

// Componente de ícone com texto
const IconeNav = ({ icone, texto, onClick }) => (
  <IconButton color="inherit" sx={{ mx: 1 }} onClick={onClick}>
    {icone}
    <Typography variant="body2" sx={{ ml: 1 }}>
      {texto}
    </Typography>
  </IconButton>
);
