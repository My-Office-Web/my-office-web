// CadastroLogin.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./CadastroLogin.css";

const CadastroLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation(); // Pegando a prop 'isSignUp' passada via navigate

  useEffect(() => {
    // Pegando o estado passado pela navegação
    if (location.state && location.state.isSignUp !== undefined) {
      setIsSignUp(location.state.isSignUp);
    }
  }, [location]);

  return (
    <div className="cadastro-login">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Criar Conta</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>ou use seu email para se registrar</span>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <button>Inscrever-se</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Entrar</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>ou use seu email e senha</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <a href="#">Esqueceu sua senha?</a>
            <button>Entrar</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Bem-vindo de volta!</h1>
              <p>Insira seus dados pessoais para acessar todas as funcionalidades</p>
              <button className="hidden" id="login" onClick={() => setIsSignUp(false)}>Entrar</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Olá, Amigo!</h1>
              <p>Cadastre-se com seus dados pessoais para acessar todas as funcionalidades</p>
              <button className="hidden" id="register" onClick={() => setIsSignUp(true)} >Inscrever-se</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroLogin;
