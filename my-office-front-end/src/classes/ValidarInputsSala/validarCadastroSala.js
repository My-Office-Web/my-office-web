export default class ValidarCadastroSala {
  static camposPreenchidos(campos) {
    return Object.values(campos).every(valor => valor.toString().trim() !== '');
  }

  static isCEPValido(cep) {
    // Exemplo simples: 8 dígitos numéricos (formato brasileiro)
    return /^\d{5}-?\d{3}$/.test(cep);
  }

  static isPrecoValido(preco) {
    // Aceita números com vírgula ou ponto decimal
    return /^(\d+)([.,]\d{1,2})?$/.test(preco);
  }

  static isCapacidadeValida(capacidade) {
    // Deve ser um número inteiro positivo
    return /^\d+$/.test(capacidade) && parseInt(capacidade, 10) > 0;
  }

  static validarTodos(campos) {
    const erros = {};

    if (!this.camposPreenchidos(campos)) {
      erros.geral = 'Preencha todos os campos.';
      return erros;
    }

    if (!this.isCEPValido(campos.cep)) {
      erros.cep = 'CEP inválido.';
      return erros;
    }

    if (!this.isPrecoValido(campos.preco)) {
      erros.preco = 'Preço inválido.';
      return erros;
    }

    if (!this.isCapacidadeValida(campos.capacidade)) {
      erros.capacidade = 'Capacidade inválida.';
      return erros;
    }

    if (!campos.tipo || campos.tipo.trim() === '') {
      erros.tipo = 'Selecione o tipo da sala.';
      return erros;
    }

    // Pode adicionar mais validações específicas aqui (ex: número, estado, etc)

    return erros; // Objeto vazio = tudo ok
  }
}
