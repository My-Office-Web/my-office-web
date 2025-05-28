import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, Link,
} from '@mui/material';
import { toast } from 'react-toastify';
import ValidarLogin from '../../../../classes/ValidarImputs/validarLogin';
import ServicoAutenticacao from '../../../servicos/ServicoAutenticacao';


const instanciaAutenticacao = new ServicoAutenticacao()

export default function ModalLogin({ open, onClose, toggleModalCadastro }) {
  const [form, setForm] = useState({ email: '', senha: '' });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erros = ValidarLogin.validarTodos(form);

    if (Object.keys(erros).length > 0) {
      Object.values(erros).forEach((msg) => toast.error(msg));
      return;
    }
    const { email, senha } = form
    instanciaAutenticacao.login(email,senha)
    toast.success('Login realizado com sucesso!');
    window.location.reload()
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
        Entrar
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            margin="dense"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Senha"
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
            margin="dense"
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: '#FF5A00',
              color: 'white',
              borderRadius: '999px',
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#e64a00',
              },
            }}
          >
            Entrar
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mb: 3 }}>
        <Typography align="center" sx={{ fontSize: 14 }}>
          Não possui uma conta?{' '}
          <Link
            href="#"
            onClick={() => {
              onClose(); // Fecha login
              setTimeout(toggleModalCadastro, 100); // Abre cadastro
            }}
            underline="hover"
            sx={{ color: '#FF5A00', fontWeight: 500 }}
          >
            Cadastre-se aqui
          </Link>
        </Typography>
      </DialogActions>
    </Dialog>
  );
}
