class ServicoAutenticacao {
    login(email, senha) {
      localStorage.setItem("usuario-logado", JSON.stringify({email,senha}));
    }
  
    usuarioEstaLogado() {
      const usuarioLogado = localStorage.getItem("usuario-logado");
      if (usuarioLogado) {
        return true;
      }
  
      return false;
    }
  
    logout() {
      localStorage.removeItem("usuario-logado");
    }
}  

export default ServicoAutenticacao;