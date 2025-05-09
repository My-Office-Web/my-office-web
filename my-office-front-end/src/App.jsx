import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cabecalho from "./comum/componentes/Cabecalho/Cabecalho";
import PaginaInicial from "./comum/componentes/Paginas/PaginaInicial/PaginaInicial";
import Rodape from "./comum/componentes/Rodape/Rodape";
import Perfil from "./comum/componentes/Paginas/Perfil/Perfil";
import Configuracoes from "./comum/componentes/Paginas/Configuracoes/Configuracoes";
import Mensagem from "./comum/componentes/Paginas/Mensagem/Mensagem";
import CadastroLogin from "./comum/componentes/Paginas/CadastroLogin/CadastroLogin";

const Layout = ({ children }) => (
  <>
    <Cabecalho />
    {children}
    <Rodape />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <PaginaInicial />
      </Layout>
    ),
  },
  {
    path: "/perfil",
    element: (
      <Layout>
        <Perfil />
      </Layout>
    ),
  },
  {
    path: "/configuracoes",
    element: (
      <Layout>
        <Configuracoes/>
      </Layout>
    ),
  },
  {
    path: "/mensagem",
    element: (
      <Layout>
        <Mensagem/>
      </Layout>
    ),
  },
  {
    path: "/cadastro-login",
    element: (
      <Layout>
        <CadastroLogin/>
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
