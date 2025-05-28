import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CadastroSala from './comum/Componentes/Paginas/PaginaCadatroSala/PaginaCadastroSala';
import PaginaInicialLogado from './comum/Componentes/Paginas/PaginaLogado/PaginaInicialLogado';
import AlugarlSala from './comum/Componentes/Paginas/AlugarSala/AlugarSala';
import Anunciar from './comum/Componentes/Paginas/AnunciarSala/Anunciar';
import PaginaInicial from './comum/Componentes/Paginas/PaginaInicial/PaginaInicial';

// Apenas páginas reais no roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial/>,
  },
  {
    path: '/cadastro-sala',
    element: <CadastroSala/>,
  },
  {
    path: '/pagina-logado',
    element: <PaginaInicialLogado/>
  },
  {
    path: '/alugar',
    element: <AlugarlSala/>
  },
  {
    path: '/anunciar',
    element:<Anunciar/>
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
