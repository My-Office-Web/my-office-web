const ValidarCadastroSala = require("../classes/ValidarInputsSala/validarCadastroSala");

describe("Testes da classe ValidarCadastroSala", () => {
  let campos;

  beforeEach(() => {
    campos = {
      cep: "12345-678",
      estado: "SC",
      cidade: "Florianópolis",
      bairro: "Centro",
      rua: "Rua das Flores",
      numero: "123",
      preco: "100.00",
      capacidade: "50",
      descricao: "Sala ampla",
      tipo: "Reunião",
      imagem: "imagem.jpg"
    };
  });

  test("Validação com todos os campos corretos", () => {
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({});
  });

  test("Erro ao deixar um campo obrigatório vazio", () => {
    campos.cidade = "";
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({ geral: "Preencha todos os campos." });
  });

  test("Erro ao usar CEP inválido", () => {
    campos.cep = "abc";
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({ cep: "CEP inválido." });
  });

  test("Erro ao usar preço inválido", () => {
    campos.preco = "cem reais";
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({ preco: "Preço inválido." });
  });

  test("Erro ao usar capacidade inválida (texto)", () => {
    campos.capacidade = "cinquenta";
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({ capacidade: "Capacidade inválida." });
  });

  test("Erro ao usar capacidade igual a 0", () => {
    campos.capacidade = "0";
    const result = ValidarCadastroSala.validarTodos(campos);
    expect(result).toEqual({ capacidade: "Capacidade inválida." });
  });

  test("Erro ao deixar imagem vazia", () => {
    campos.imagem = " ";
    const result = ValidarCadastroSala.validarImagem(campos.imagem);
    expect(result).toBe(false);
  });
});