import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
