class ServicoAutenticacao {
  login(token, usuario) {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("usuario-logado", JSON.stringify(usuario));
  }

  usuarioEstaLogado() {
    return !!localStorage.getItem("auth-token");
  }

  obterToken() {
    return localStorage.getItem("auth-token");
  }

  obterUsuario() {
    const usuario = localStorage.getItem("usuario-logado");
    return usuario ? JSON.parse(usuario) : null;
  }

  logout() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("usuario-logado");
  }
}

export default ServicoAutenticacao;
