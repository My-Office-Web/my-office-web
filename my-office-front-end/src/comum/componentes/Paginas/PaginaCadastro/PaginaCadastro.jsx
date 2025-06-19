import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, Link,
} from '@mui/material';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import ValidarCadastro from '../../../../classes/ValidarInputsUsuario/validarCadastro';

const campos = [
  { label: 'Nome completo', name: 'nome' },
  { label: 'E-mail', name: 'email', type: 'email' },
  { label: 'Telefone', name: 'telefone' },
  { label: 'Senha', name: 'senha', type: 'password' },
  { label: 'Confirmar Senha', name: 'confirmarSenha', type: 'password' },
];

export default function ModalCadastro({ open, onClose, toggleModalLogin }) {
  const [form, setForm] = useState(Object.fromEntries(campos.map(({ name }) => [name, ''])));

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erros = ValidarCadastro.validarTodos(form);

    if (Object.keys(erros).length > 0) {
      Object.values(erros).forEach(msg => toast.error(msg));
      return;
    }
    try {
      const response = await fetch('https://my-office-web.onrender.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...form}),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar usuário.');

      toast.success('Usuário cadastrado com sucesso!');
      setTimeout(() => {
        setForm(Object.fromEntries(campos.map(({ name }) => [name, ''])));
        onClose();
      }, 1000);
    } catch (error) {
      toast.error('Erro ao cadastrar usuário.');
      console.error(error);
    }

    
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold', color: '#FF5A00' }}>
        Cadastre-se
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {campos.map(({ label, name, type = 'text' }) =>
            name === 'telefone' ? (
              <InputMask
                key={name}
                mask="(99) 99999-9999"
                value={form[name]}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    label={label}
                    name={name}
                    margin="dense"
                    required
                    variant="outlined"
                  />
                )}
              </InputMask>
            ) : (
              <TextField
                key={name}
                fullWidth
                label={label}
                name={name}
                type={type}
                margin="dense"
                value={form[name]}
                onChange={handleChange}
                required
                variant="outlined"
              />
            )
          )}

          <Typography align="center" sx={{ mt: 2, fontSize: 14 }}>
            Já possui uma conta?{' '}
            <Link
              href="#"
              onClick={() => {
                onClose();
                setTimeout(toggleModalLogin, 200);
              }}
              underline="hover"
              sx={{ color: '#FF5A00', fontWeight: 500 }}
            >
              Entre aqui
            </Link>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant='outlined' onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit}
          sx={{
            backgroundColor: '#FF5A00',
            color: 'white',
            '&:hover': { backgroundColor: '#e64a00' },
          }}>
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
