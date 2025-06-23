import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpIcon from "@mui/icons-material/Help";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EventIcon from "@mui/icons-material/Event";

import TemporaryDrawer from "../PaginaInicial/MenuLateral";
import ModalCadastroSala from "../PaginaCadatroSala/PaginaCadastroSala";
import ModalMinhasSalas from "../PaginaMinhasSalas/PaginaMinhasSalas";
import PaginaPerfilUsuario from "../../Perfil/Perfil";
import ModalFavoritos from "../../Favoritos/Favoritos";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";
import { useNavigate } from "react-router-dom";
import ModalReservas from "../../ReservasSalas/ReservasSalas";

const instanciaAutenticacao = new ServicoAutenticacao();

export default function AppBarLogado() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModalCadastroSala, setOpenModalCadastroSala] = useState(false);
  const [openModalMinhasSalas, setOpenModalMinhasSalas] = useState(false);
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [openFavoritos, setOpenFavoritos] = useState(false);
  const [openModalReservas, setOpenModalReservas] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    instanciaAutenticacao.logout();
    window.location.reload();
  };

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario-logado")) || {};

  const getInitials = (nome) => {
    if (!nome) return "U";
    const partes = nome.trim().split(" ");
    return partes.length === 1
      ? partes[0][0].toUpperCase()
      : (partes[0][0] + partes[1][0]).toUpperCase();
  };

  const initials = getInitials(usuarioLogado.nome);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu Lateral */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="/logo.png" alt="Logo MyOffice" style={{ height: 50 }} />
          </Box>

          </Box>

          {/* Central Items */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <IconButton color="inherit" onClick={() => navigate("/")}>
              <HomeIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Início
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ marginLeft: 2 }}
              onClick={() => setOpenModalCadastroSala(true)}
            >
              <AddBusinessIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Cadastrar Sala
              </Typography>
            </IconButton>

            <IconButton color="inherit" sx={{ marginLeft: 2 }}
            onClick={() => setOpenModalReservas(true)}>
              <EventIcon  />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Reservas
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ marginLeft: 2 }}
              onClick={() => setOpenModalMinhasSalas(true)}
            >
              <MeetingRoomIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Minhas Salas
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ marginLeft: 2 }}
              onClick={() => setOpenFavoritos(true)}
            >
              <FavoriteIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Favoritos
              </Typography>
            </IconButton>

            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <HelpIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Ajuda
              </Typography>
            </IconButton>
          </Box>

          {/* Avatar do usuário */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir menu do usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "silver" }}>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  setOpenModalPerfil(true);
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* Modal de Cadastro de Sala */}
      <ModalCadastroSala
        open={openModalCadastroSala}
        onClose={() => setOpenModalCadastroSala(false)}
      />

      {/* Modal de Minhas Salas */}
      <ModalMinhasSalas
        open={openModalMinhasSalas}
        onClose={() => setOpenModalMinhasSalas(false)}
      />

      {/* Modal de Perfil do Usuário */}
      <PaginaPerfilUsuario
        open={openModalPerfil}
        onClose={() => setOpenModalPerfil(false)}
        usuario={usuarioLogado}
      />

      {/* Modal de Favoritos */}
      <ModalFavoritos
        open={openFavoritos}
        onClose={() => setOpenFavoritos(false)}
      />

      <ModalReservas open={openModalReservas} onClose={() => setOpenModalReservas(false)} />
    </Box>
  );
}