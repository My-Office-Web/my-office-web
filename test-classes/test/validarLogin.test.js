const ValidarLogin = require("../classes/ValidarInputsUsuario/validarLogin");


describe("Testes da classe ValidarLogin", () => {
  describe("validarEmail", () => {
    test("retorna true para email válido", () => {
      expect(ValidarLogin.validarEmail("usuario@teste.com")).toBe(true);
    });

    test("retorna false para email inválido", () => {
      expect(ValidarLogin.validarEmail("usuario@com")).toBe(false);
      expect(ValidarLogin.validarEmail("usuario.com")).toBe(false);
      expect(ValidarLogin.validarEmail("")).toBe(false);
    });
  });

  describe("validarTodos", () => {
    let dados;

    beforeEach(() => {
      dados = {
        email: "usuario@teste.com",
        senha: "senha123"
      };
    });

    test("retorna objeto vazio quando email e senha são válidos", () => {
      const result = ValidarLogin.validarTodos(dados);
      expect(result).toEqual({});
    });

    test("retorna erro se email estiver vazio", () => {
      dados.email = "";
      const result = ValidarLogin.validarTodos(dados);
      expect(result).toEqual({ email: "O campo e-mail é obrigatório." });
    });

    test("retorna erro se email for inválido", () => {
      dados.email = "emailinvalido";
      const result = ValidarLogin.validarTodos(dados);
      expect(result).toEqual({ email: "Formato de e-mail inválido." });
    });

    test("retorna erro se senha estiver vazia", () => {
      dados.senha = "";
      const result = ValidarLogin.validarTodos(dados);
      expect(result).toEqual({ senha: "O campo senha é obrigatório." });
    });

    test("retorna erro se senha for menor que 8 caracteres", () => {
      dados.senha = "1234567";
      const result = ValidarLogin.validarTodos(dados);
      expect(result).toEqual({ senha: "A senha deve ter no mínimo 8 caracteres." });
    });
  });
});
