// testMock/FavoritosControllerMock.test.js


const FavoritosController = require("../classes/classes-api-test/FavoritosController");

describe("FavoritosController", () => {
  let favoritosController;
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      body: { sala_id: 10 },
      params: { salaId: 10 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test("adicionar - sucesso", async () => {
    const queryMock = jest.fn()
      .mockResolvedValueOnce([[]]) // SELECT * FROM favoritos (não encontrou)
      .mockResolvedValueOnce([{ insertId: 1 }]); // INSERT INTO favoritos

    require("../database/fakeDbQuery").db.promise = () => ({ query: queryMock });

    favoritosController = new FavoritosController();
    await favoritosController.adicionar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Sala adicionada aos favoritos." });
  });

  test("adicionar - sala já favoritada", async () => {
    const queryMock = jest.fn()
      .mockResolvedValueOnce([[{ sala_id: 10 }]]); // SELECT * FROM favoritos (encontrou)

    require("../database/fakeDbQuery").db.promise = () => ({ query: queryMock });

    favoritosController = new FavoritosController();
    await favoritosController.adicionar(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Sala já está nos favoritos." });
  });

  test("remover - sucesso", async () => {
    const queryMock = jest.fn()
      .mockResolvedValueOnce([{ affectedRows: 1 }]); // DELETE FROM favoritos

    require("../database/fakeDbQuery").db.promise = () => ({ query: queryMock });

    favoritosController = new FavoritosController();
    await favoritosController.remover(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Favorito removido com sucesso." });
  });

  test("verificar - favoritado", async () => {
    const queryMock = jest.fn()
      .mockResolvedValueOnce([[{ id: 1 }]]); // SELECT * FROM favoritos (encontrou)

    require("../database/fakeDbQuery").db.promise = () => ({ query: queryMock });

    favoritosController = new FavoritosController();
    await favoritosController.verificar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ favoritado: true });
  });

  test("listar - sucesso", async () => {
    const fakeResult = [
      {
        id: 1,
        tipo: "Reunião",
        descricao: "Sala grande"
      }
    ];

    const queryMock = jest.fn()
      .mockResolvedValueOnce([fakeResult]); // SELECT com JOIN salas

    require("../database/fakeDbQuery").db.promise = () => ({ query: queryMock });

    favoritosController = new FavoritosController();
    await favoritosController.listar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
  });
});
