import React, { useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./MenuLateral";
import { TbLogin2 } from "react-icons/tb";
import ModalCadastro from "../PaginaCadastro/PaginaCadastro";
import ModalLogin from "../PaginaLogin/PaginaLogin";


export default function ButtonAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCadastro, setOpenModalCadastro] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const toggleModalCadastro = () => {
    setOpenModalCadastro(!openModalCadastro);
    if (openModalLogin) setOpenModalLogin(false); 
  };

  const toggleModalLogin = () => {
    setOpenModalLogin(!openModalLogin);
    if (openModalCadastro) setOpenModalCadastro(false); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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

          {/* BOTÃO CRIAR CONTA abre modal */}
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="warning"
            onClick={toggleModalCadastro}
          >
            Criar Conta
          </Button>

          {/* BOTÃO LOGIN ABRE O MODAL DE LOGIN */}
          <Button
            variant="contained"
            color="success"
            onClick={toggleModalLogin} 
          >
            <TbLogin2 size={20} /> Entrar
          </Button>
        </Toolbar>
      </AppBar>

      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* MODAL DE CADASTRO */}
      <ModalCadastro
        open={openModalCadastro}
        onClose={toggleModalCadastro} 
        toggleModalLogin={toggleModalLogin} 
      />

      {/* MODAL DE LOGIN */}
      <ModalLogin
        open={openModalLogin}
        onClose={toggleModalLogin} 
        toggleModalCadastro={toggleModalCadastro} 
      />
    </Box>
  );
}
