import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PaginaDeBuscaComFiltros from './comum/componentes/Paginas/PaginaDeBuscaComFiltros/PaginaDeBuscaComFiltros';
import ScrollToTopWrapper from './comum/componentes/ScrollToTop/ScrollToTop';

import { SalasProvider } from './comum/componentes/SalasContext/SalasContext';
import PaginaInicialLogado from './comum/componentes/Paginas/PaginaLogado/PaginaInicialLogado';
import PaginaInicialVisitante from './comum/componentes/Paginas/PaginaInicial/PaginaInicialVisitante';
import VerificarAutenticacao from './comum/componentes/VerificarAutorizacao/VerificarAutorizacao';

const router = createBrowserRouter([
  {
    path: '/visitante',
    element: (
      <ScrollToTopWrapper>
        <PaginaInicialVisitante />
      </ScrollToTopWrapper>
    ),
  },
  {
    path: '',
    element: <VerificarAutenticacao />,
    children: [
    {
      path: '/',
      element: (
        <ScrollToTopWrapper>
          <PaginaInicialLogado />
        </ScrollToTopWrapper>
      ),
    },
    {
      path: '/busca',
      element: (
        <ScrollToTopWrapper>
          <PaginaDeBuscaComFiltros />
        </ScrollToTopWrapper>
      ),
    },
  ]},
]);

function App() {
  return (
    <SalasProvider>
      <ToastContainer position="top-right" autoClose={5000} />
      <RouterProvider router={router} />
    </SalasProvider>
  );
}

export default App;
