export default class ValidarCadastroSala {
  static camposObrigatorios = [
    'cep', 'estado', 'cidade', 'bairro', 'rua', 'numero', 
    'preco', 'capacidade', 'descricao', 'tipo', 'imagem'
  ];

  static camposPreenchidos(campos) {
    return this.camposObrigatorios.every(campo => {
      const valor = campos[campo];
      return valor !== undefined && valor !== null && valor.toString().trim() !== '';
    });
  }

  static isCEPValido(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
  }

  static isPrecoValido(preco) {
    return /^(\d+)([.,]\d{1,2})?$/.test(preco);
  }

  static isCapacidadeValida(capacidade) {
    return /^\d+$/.test(capacidade) && parseInt(capacidade, 10) > 0;
  }

  static validarImagem(imagem) {
    return imagem && imagem.toString().trim() !== '';
  }

  static validarTodos(campos) {
    
    if (!this.camposPreenchidos(campos)) {
      return { geral: 'Preencha todos os campos.' };
    }

   
    if (!this.isCEPValido(campos.cep)) {
      return { cep: 'CEP inválido.' };
    }

    if (!this.isPrecoValido(campos.preco)) {
      return { preco: 'Preço inválido.' };
    }

    if (!this.isCapacidadeValida(campos.capacidade)) {
      return { capacidade: 'Capacidade inválida.' };
    }

    if (!this.validarImagem(campos.imagem)) {
      return { imagem: 'Por favor, envie uma imagem da sala.' };
    }

    return {};
  }
}
