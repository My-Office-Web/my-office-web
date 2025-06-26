import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TbLogin2 } from 'react-icons/tb';

import TemporaryDrawer from './MenuLateral';
import ModalCadastro from '../PaginaCadastro/PaginaCadastro';
import ModalLogin from '../PaginaLogin/PaginaLogin';
import AjudaModal from '../../Ajuda/AjudaModal';

export default function ButtonAppBar() {
  // Estados de modais e menu lateral
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalCadastro, setOpenModalCadastro] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openAjudaModal, setOpenAjudaModal] = useState(false);

  // Funções toggle
  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const toggleModalCadastro = () => {
    setOpenModalCadastro(!openModalCadastro);
    setOpenModalLogin(false);
    setOpenAjudaModal(false);
  };

  const toggleModalLogin = () => {
    setOpenModalLogin(!openModalLogin);
    setOpenModalCadastro(false);
    setOpenAjudaModal(false);
  };

  const toggleAjudaModal = () => {
    setOpenAjudaModal(!openAjudaModal);
    setOpenModalCadastro(false);
    setOpenModalLogin(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Botão de menu lateral */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="abrir menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="/logo.png" alt="Logo MyOffice" style={{ height: 50 }} />
          </Box>

          {/* Botão Criar Conta */}
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            color="warning"
            onClick={toggleModalCadastro}
          >
            Criar Conta
          </Button>

          {/* Botão Entrar */}
          <Button
            variant="contained"
            color="success"
            onClick={toggleModalLogin}
            startIcon={<TbLogin2 size={20} />}
          >
            Entrar
          </Button>
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

      {/* Modais */}
      <ModalCadastro
        open={openModalCadastro}
        onClose={toggleModalCadastro}
        toggleModalLogin={toggleModalLogin}
      />

      <ModalLogin
        open={openModalLogin}
        onClose={toggleModalLogin}
        toggleModalCadastro={toggleModalCadastro}
      />

      <AjudaModal
        open={openAjudaModal}
        onClose={toggleAjudaModal}
      />
    </Box>
  );
}
