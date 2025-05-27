import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TemporaryDrawer from "../PaginaInicial/MenuLateral";
import HomeIcon from "@mui/icons-material/Home"; // Icone para "Início"
import FavoriteIcon from "@mui/icons-material/Favorite"; // Icone para "Favoritos"
import HelpIcon from "@mui/icons-material/Help"; // Icone para "Ajuda"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // Icone para "Salas"
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";

const instanciaAutenticacao = new ServicoAutenticacao()

export default function AppBarLogado() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    instanciaAutenticacao.logout()
  }

  // Nome do usuário
  const userName = "João Silva";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
            <Typography variant="h6" component="div">
              MyOffice
            </Typography>
          </Box>

          {/* Itens centralizados no AppBar */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
            <IconButton color="inherit">
              <HomeIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Início</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <HomeIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Alugar</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <MeetingRoomIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>minhas Salas</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <FavoriteIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Favoritos</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <HelpIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Ajuda</Typography>
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
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
