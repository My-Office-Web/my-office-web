import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

const VerificarAutenticacao = () => {
  const navigate = useNavigate();

  const usuarioEstaLogado = instanciaServicoAutenticacao.usuarioEstaLogado();

  useEffect(() => {
    if (!usuarioEstaLogado) {
      navigate('/visitante');
    }
  }, [navigate, usuarioEstaLogado]);

  return usuarioEstaLogado ? <Outlet /> : null;
};

export default VerificarAutenticacao;