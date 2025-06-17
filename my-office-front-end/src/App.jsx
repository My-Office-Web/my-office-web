import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginaInicial from './comum/componentes/Paginas/PaginaInicial/PaginaInicial';
import LandingPage from './comum/componentes/Paginas/LandingPage/LandingPage';
import PaginaDeBuscaComFiltros from './comum/componentes/Paginas/PaginaDeBuscaComFiltros/PaginaDeBuscaComFiltros';

// Apenas páginas reais no roteador
const router = createBrowserRouter([
  {
    path: '/novo',
    element: <LandingPage/>,
  },
  {
    path: '/busca',
    element: <PaginaDeBuscaComFiltros/>,
  },
  {
    path: '/',
    element: <PaginaInicial/>,
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
