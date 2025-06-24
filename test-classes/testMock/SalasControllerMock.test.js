const SalasController = require('../classes/classes-api-test/SalasController');
const { db } = require('../database/fakeDbQuery');


jest.mock('../database/fakeDbQuery', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('SalasController', () => {
  let salasController;
  let req, res;

  beforeEach(() => {
    salasController = new SalasController(db);

    req = {
      body: {},
      params: {},
      user: { id: 1 },
      usuario: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    db.query.mockClear();
    jest.clearAllMocks();
  });

  describe('cadastrar', () => {
    it('deve cadastrar sala com sucesso', () => {
      req.body = {
        cep: '12345-678',
        estado: 'SP',
        cidade: 'São Paulo',
        bairro: 'Centro',
        rua: 'Rua A',
        numero: '100',
        preco: 200,
        capacidade: 10,
        tipo: 'Reunião',
        descricao: 'Sala de reunião',
        imagem: 'imagem.jpg',
        latitude: -23.5,
        longitude: -46.6,
        usuario_id: 1,
      };

      db.query.mockImplementation((query, params, cb) => {
        cb(null, { insertId: 99 });
      });

      salasController.cadastrar(req, res);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 99 });
    });

    it('deve retornar erro 500 em falha do banco', () => {
      req.body = { usuario_id: 1 };

      db.query.mockImplementation((query, params, cb) => {
        cb(new Error('Falha no banco'), null);
      });

      salasController.cadastrar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao salvar a sala" });
    });
  });

  describe('listar', () => {
    it('deve listar salas com sucesso', () => {
      const salas = [{ id_sala: 1, descricao: 'Sala 1' }];

      db.query.mockImplementation((query, cb) => {
        cb(null, salas);
      });

      salasController.listar(req, res);

      expect(res.json).toHaveBeenCalledWith(salas);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('deve retornar erro 500 se falhar ao listar', () => {
      db.query.mockImplementation((query, cb) => {
        cb(new Error('Erro no banco'), null);
      });

      salasController.listar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar salas" });
    });
  });

  describe('listarMinhasSalas', () => {
    it('deve listar as salas do usuário', () => {
      const salas = [{ id_sala: 10, usuario_id: 1, descricao: 'Minha sala' }];

      db.query.mockImplementation((query, params, cb) => {
        expect(params).toEqual([req.usuario.id]);
        cb(null, salas);
      });

      salasController.listarMinhasSalas(req, res);

      expect(res.json).toHaveBeenCalledWith(salas);
    });

    it('deve retornar erro 500 se falhar', () => {
      db.query.mockImplementation((query, params, cb) => {
        cb(new Error('Erro banco'), null);
      });

      salasController.listarMinhasSalas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar salas do usuário" });
    });
  });

  describe('editar', () => {
    it('deve editar sala com sucesso', () => {
      req.params.id = 5;
      req.body = {
        cep: '12345-678',
        estado: 'SP',
        cidade: 'São Paulo',
        bairro: 'Centro',
        rua: 'Rua A',
        numero: '100',
        preco: 200,
        capacidade: 10,
        tipo: 'Reunião',
        descricao: 'Sala atualizada',
        imagem: 'img.jpg',
        latitude: -23.5,
        longitude: -46.6,
        usuario_id: 1,
      };

      db.query.mockImplementation((query, params, cb) => {
        cb(null, { affectedRows: 1 });
      });

      salasController.editar(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Sala atualizada com sucesso" });
    });

    it('deve retornar 404 se sala não encontrada', () => {
      req.params.id = 5;
      req.body = { usuario_id: 1 };

      db.query.mockImplementation((query, params, cb) => {
        cb(null, { affectedRows: 0 });
      });

      salasController.editar(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Sala não encontrada" });
    });

    it('deve retornar 500 se erro no banco', () => {
      req.params.id = 5;
      req.body = { usuario_id: 1 };

      db.query.mockImplementation((query, params, cb) => {
        cb(new Error('Erro banco'), null);
      });

      salasController.editar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao atualizar a sala" });
    });
  });

  describe('excluir', () => {
    it('deve excluir sala com sucesso', () => {
      req.params.id = 8;
      req.user.id = 1;

      db.query.mockImplementation((query, params, cb) => {
        expect(params).toEqual([8, 1]);
        cb(null, { affectedRows: 1 });
      });

      salasController.excluir(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Sala excluída com sucesso" });
    });

    it('deve retornar 404 se sala não pertence ao usuário', () => {
      req.params.id = 8;
      req.user.id = 1;

      db.query.mockImplementation((query, params, cb) => {
        cb(null, { affectedRows: 0 });
      });

      salasController.excluir(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Sala não encontrada ou não pertence ao usuário" });
    });

    it('deve retornar 500 se erro no banco', () => {
      req.params.id = 8;
      req.user.id = 1;

      db.query.mockImplementation((query, params, cb) => {
        cb(new Error('Erro banco'), null);
      });

      salasController.excluir(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao excluir sala" });
    });
  });
});
