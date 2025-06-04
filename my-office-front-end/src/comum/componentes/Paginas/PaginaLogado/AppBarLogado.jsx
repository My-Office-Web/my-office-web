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
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpIcon from "@mui/icons-material/Help";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ServicoAutenticacao from "../../../servicos/ServicoAutenticacao";
import ModalCadastroSala from "../PaginaCadatroSala/PaginaCadastroSala";
import { useNavigate } from "react-router-dom";

const instanciaAutenticacao = new ServicoAutenticacao();

export default function AppBarLogado() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModalCadastroSala, setOpenModalCadastroSala] = useState(false); // modal de cadastro

  const navigate = useNavigate()

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

          {/* Central Items */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
            <IconButton color="inherit" onClick={()=> navigate("/novo")}>
              <HomeIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Início</Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ marginLeft: 2 }}
              onClick={() => setOpenModalCadastroSala(true)}
            >
              <AddBusinessIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Cadastrar Sala</Typography>
            </IconButton>

            {/* <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <HomeIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Alugar</Typography>
            </IconButton> */}

            <IconButton color="inherit" sx={{ marginLeft: 2 }}>
              <MeetingRoomIcon />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>Minhas Salas</Typography>
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

      {/* Menu lateral */}
      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* Modal de Cadastro de Sala */}
      <ModalCadastroSala
        open={openModalCadastroSala}
        onClose={() => setOpenModalCadastroSala(false)}
      />
    </Box>
  );
}
