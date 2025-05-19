import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import PaginaInicial from './comum/Componentes/Paginas/PaginaInicial/PaginaInicial';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CadastroSala from './comum/Componentes/Paginas/PaginaCadatroSala/PaginaCadastroSala';
import AppBarLogado from './comum/Componentes/Paginas/PaginaLogado/AppBarLogado';
import PaginaInicialLogado from './comum/Componentes/Paginas/PaginaLogado/PaginaInicialLogado';

// Apenas páginas reais no roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial />,
  },
  {
    path: '/cadastro-sala',
    element: <CadastroSala/>,
  },
  {
    path: '/pagina-logado',
    element: <PaginaInicialLogado/>
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
