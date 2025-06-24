const ReservaSalas = require('../classes/classes-api-test/ReservaSalas');
const { db} = require('../database/fakeDbQuery');
// ReservaSalasMock.test.js

// Mock inline do módulo do banco
jest.mock('../database/fakeDbQuery', () => ({
    db: {
      query: jest.fn()
    }
  }));
 
  
  describe('ReservaSalas', () => {
    let reservaSalas;
    let req, res;
  
    beforeEach(() => {
      reservaSalas = new ReservaSalas(db);  // <-- passe o db aqui
      req = { body: {} };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    
      db.query.mockClear();
      jest.clearAllMocks();
    });
    
    describe('criarReserva', () => {
      it('deve retornar 400 se faltar dados obrigatórios', () => {
        req.body = {}; // sem dados
  
        reservaSalas.criarReserva(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          error: 'usuario_id, sala_id e data são obrigatórios.'
        });
      });
  
      it('deve retornar 409 se reserva já existir', () => {
        req.body = { usuario_id: 1, sala_id: 2, data: '2025-06-21' };
  
        // primeiro db.query simula reserva existente
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(null, [{ id: 1 }]);
        });
  
        reservaSalas.criarReserva(req, res);
  
        expect(db.query).toHaveBeenCalledWith(
          expect.stringContaining('SELECT * FROM reservas'),
          [2, '2025-06-21'],
          expect.any(Function)
        );
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: 'Sala já reservada nesta data.' });
      });
  
      it('deve criar reserva com sucesso', () => {
        req.body = { usuario_id: 1, sala_id: 2, data: '2025-06-21' };
  
        // Primeiro db.query (check) retorna vazio
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(null, []);
        });
  
        // Segundo db.query (insert) simula sucesso
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(null, { insertId: 123 });
        });
  
        reservaSalas.criarReserva(req, res);
  
        expect(db.query).toHaveBeenCalledTimes(2);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Reserva criada com sucesso!',
          reservaId: 123
        });
      });
  
      it('deve retornar 500 se erro na verificação', () => {
        req.body = { usuario_id: 1, sala_id: 2, data: '2025-06-21' };
  
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(new Error('Erro no banco'), null);
        });
  
        reservaSalas.criarReserva(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor.' });
      });
  
      it('deve retornar 500 se erro ao inserir reserva', () => {
        req.body = { usuario_id: 1, sala_id: 2, data: '2025-06-21' };
  
        // check ok
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(null, []);
        });
  
        // erro no insert
        db.query.mockImplementationOnce((query, params, cb) => {
          cb(new Error('Erro inserção'), null);
        });
  
        reservaSalas.criarReserva(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao salvar reserva.' });
      });
    });
  
    describe('listarReservas', () => {
      it('deve listar reservas com sucesso', () => {
        const resultadosFake = [
          { id: 1, data: '2025-06-21', usuario_nome: 'Hayla', sala_tipo: 'Reunião', sala_descricao: 'Sala 1' }
        ];
  
        db.query.mockImplementationOnce((query, cb) => {
          cb(null, resultadosFake);
        });
  
        reservaSalas.listarReservas(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(resultadosFake);
      });
  
      it('deve retornar 500 se erro ao listar reservas', () => {
        db.query.mockImplementationOnce((query, cb) => {
          cb(new Error('Erro no banco'), null);
        });
  
        reservaSalas.listarReservas(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar reservas.' });
      });
    });
  });
  