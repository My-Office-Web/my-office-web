const ValidarCadastro = require("../classes/ValidarInputsUsuario/validarCadastro");


describe("Testes da classe ValidarCadastro", () => {
  describe("isEmailValido", () => {
    test("deve retornar true para email válido", () => {
      expect(ValidarCadastro.isEmailValido("teste@email.com")).toBe(true);
    });

    test("deve retornar false para email inválido", () => {
      expect(ValidarCadastro.isEmailValido("email@inválido")).toBe(false);
    });
  });

  describe("isTelefoneValido", () => {
    test("deve aceitar telefone com DDD e traço", () => {
      expect(ValidarCadastro.isTelefoneValido("(48) 91234-5678")).toBe(true);
    });

    test("deve aceitar telefone sem parênteses", () => {
      expect(ValidarCadastro.isTelefoneValido("48912345678")).toBe(true);
    });

    test("deve retornar false para número incompleto", () => {
      expect(ValidarCadastro.isTelefoneValido("91234")).toBe(false);
    });
  });

  describe("isSenhaValida", () => {
    test("deve retornar true para senha com 8 ou mais caracteres", () => {
      expect(ValidarCadastro.isSenhaValida("12345678")).toBe(true);
    });

    test("deve retornar false para senha com menos de 8 caracteres", () => {
      expect(ValidarCadastro.isSenhaValida("abc123")).toBe(false);
    });
  });

  describe("senhasConferem", () => {
    test("deve retornar true se as senhas forem iguais", () => {
      expect(ValidarCadastro.senhasConferem("senha123", "senha123")).toBe(true);
    });

    test("deve retornar false se as senhas forem diferentes", () => {
      expect(ValidarCadastro.senhasConferem("senha123", "outrasenha")).toBe(false);
    });
  });

  describe("camposPreenchidos", () => {
    test("deve retornar true se todos os campos estiverem preenchidos", () => {
      const campos = {
        nome: "Hayla",
        email: "hayla@email.com",
        telefone: "48912345678",
        senha: "senha123",
        confirmarSenha: "senha123"
      };
      expect(ValidarCadastro.camposPreenchidos(campos)).toBe(true);
    });

    test("deve retornar false se algum campo estiver vazio", () => {
      const campos = {
        nome: "",
        email: "hayla@email.com",
        telefone: "48912345678",
        senha: "senha123",
        confirmarSenha: "senha123"
      };
      expect(ValidarCadastro.camposPreenchidos(campos)).toBe(false);
    });
  });

  describe("validarTodos", () => {
    let campos;

    beforeEach(() => {
      campos = {
        nome: "Hayla",
        email: "hayla@email.com",
        telefone: "48912345678",
        senha: "senha123",
        confirmarSenha: "senha123"
      };
    });

    test("deve retornar objeto vazio se todos os dados estiverem corretos", () => {
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({});
    });

    test("deve retornar erro se algum campo estiver vazio", () => {
      campos.telefone = "";
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({ geral: "Preencha todos os campos." });
    });

    test("deve retornar erro se email for inválido", () => {
      campos.email = "emailerrado";
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({ email: "E-mail inválido." });
    });

    test("deve retornar erro se telefone for inválido", () => {
      campos.telefone = "999";
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({ telefone: "Telefone inválido." });
    });

    test("deve retornar erro se senha for curta", () => {
      campos.senha = "123";
      campos.confirmarSenha = "123";
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({ senha: "A senha deve ter no mínimo 8 caracteres." });
    });

    test("deve retornar erro se as senhas não conferirem", () => {
      campos.confirmarSenha = "senhadiferente";
      const result = ValidarCadastro.validarTodos(campos);
      expect(result).toEqual({ confirmarSenha: "As senhas não coincidem." });
    });
  });
});
