import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PaginaInicial from './comum/componentes/Paginas/PaginaInicial/PaginaInicial';
import PaginaDeBuscaComFiltros from './comum/componentes/Paginas/PaginaDeBuscaComFiltros/PaginaDeBuscaComFiltros';
import ScrollToTopWrapper from './comum/componentes/ScrollToTop/ScrollToTop';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ScrollToTopWrapper>
        <PaginaInicial />
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
]);

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
