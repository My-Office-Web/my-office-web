export default class ValidarLogin {
  static validarTodos({ email, senha }) {
    const erros = {};

    // 1. E-mail vazio
    if (!email) {
      erros.email = 'O campo e-mail é obrigatório.';
      return erros;
    }

    // 2. E-mail inválido
    if (!this.validarEmail(email)) {
      erros.email = 'Formato de e-mail inválido.';
      return erros;
    }

    // 3. Senha vazia
    if (!senha) {
      erros.senha = 'O campo senha é obrigatório.';
      return erros;
    }

    // 4. Senha curta
    if (senha.length < 8) {
      erros.senha = 'A senha deve ter no mínimo 8 caracteres.';
      return erros;
    }

    return erros;
  }

  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
