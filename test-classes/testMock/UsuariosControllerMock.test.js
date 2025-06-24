// const UsuariosController = require('../../../controllers/UsuariosController');
const bcrypt = require('bcrypt');
const UsuariosController = require('../classes/classes-api-test/UsuariosController');
// const {UsuariosController } = require('../classes/classes-api-test/UsuariosController');


describe('UsuariosController', () => {
  let req, res, usuariosController, mockQuery, mockDb;

  beforeEach(() => {
    mockQuery = jest.fn();
    mockDb = {
      promise: () => ({
        query: mockQuery
      })
    };

    usuariosController = new UsuariosController(mockDb);

    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('cadastrar()', () => {
    it('deve cadastrar um novo usuário', async () => {
      req.body = {
        nome: 'Hayla',
        email: 'hayla@email.com',
        senha: '123456',
        telefone: '999999999'
      };

      mockQuery
        .mockResolvedValueOnce([[]]) // SELECT
        .mockResolvedValueOnce([{ insertId: 1 }]); // INSERT

      await usuariosController.cadastrar(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        message: 'Usuário cadastrado com sucesso'
      });
    });

    it('deve retornar erro se e-mail já estiver cadastrado', async () => {
      req.body = {
        nome: 'Hayla',
        email: 'hayla@email.com',
        senha: '123456'
      };

      mockQuery.mockResolvedValueOnce([[{ id_usuario: 1 }]]); // SELECT

      await usuariosController.cadastrar(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'E-mail já cadastrado'
      });
    });
  });

  describe('login()', () => {
    it('deve fazer login com sucesso', async () => {
      req.body = {
        email: 'hayla@email.com',
        senha: '123456'
      };

      const senhaHash = await bcrypt.hash('123456', 10);
      const usuarioFake = {
        id_usuario: 1,
        nome: 'Hayla',
        email: 'hayla@email.com',
        senha: senhaHash
      };

      mockQuery.mockResolvedValueOnce([[usuarioFake]]);

      await usuariosController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        mensagem: 'Login realizado com sucesso',
        token: expect.any(String),
        usuario: {
          id: 1,
          nome: 'Hayla',
          email: 'hayla@email.com'
        }
      }));
    });

    it('deve retornar erro se usuário não existir', async () => {
      req.body = {
        email: 'inexistente@email.com',
        senha: '123456'
      };

      mockQuery.mockResolvedValueOnce([[]]);

      await usuariosController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Usuário não encontrado'
      });
    });

    it('deve retornar erro se senha estiver incorreta', async () => {
      const senhaHash = await bcrypt.hash('senhaErrada', 10);

      req.body = {
        email: 'hayla@email.com',
        senha: '123456'
      };

      mockQuery.mockResolvedValueOnce([[
        {
          id_usuario: 1,
          nome: 'Hayla',
          email: 'hayla@email.com',
          senha: senhaHash
        }
      ]]);

      await usuariosController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Senha incorreta'
      });
    });
  });
});
