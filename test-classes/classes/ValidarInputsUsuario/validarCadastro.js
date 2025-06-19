 class ValidarCadastro {
  
  static isEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static isTelefoneValido(telefone) {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
  }

  static isSenhaValida(senha) {
    return senha.length >= 8;
  }

  static senhasConferem(senha, confirmarSenha) {
    return senha === confirmarSenha;
  }

  static camposPreenchidos(campos) {
    return Object.values(campos).every((valor) => valor.trim() !== '');
  }

  static validarTodos(campos) {
    const erros = {};

    // 1. Verifica se todos os campos estão preenchidos
    if (!this.camposPreenchidos(campos)) {
      erros.geral = 'Preencha todos os campos.';
      return erros;
    }

    // 2. Verifica e-mail
    if (!this.isEmailValido(campos.email)) {
      erros.email = 'E-mail inválido.';
      return erros;
    }

    // 3. Verifica telefone
    if (!this.isTelefoneValido(campos.telefone)) {
      erros.telefone = 'Telefone inválido.';
      return erros;
    }

    // 4. Verifica senha
    if (!this.isSenhaValida(campos.senha)) {
      erros.senha = 'A senha deve ter no mínimo 8 caracteres.';
      return erros;
    }

    // 5. Verifica se senhas conferem
    if (!this.senhasConferem(campos.senha, campos.confirmarSenha)) {
      erros.confirmarSenha = 'As senhas não coincidem.';
      return erros;
    }

    return erros; // Objeto vazio indica que está tudo certo
  }
}

module.exports  = ValidarCadastro;