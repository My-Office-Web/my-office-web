class ReservaSalas {
    constructor(db) {
      this.db = db;
    }
  
    // Criar uma reserva
    criarReserva(req, res) {
      const { usuario_id, sala_id, data } = req.body;
  
      if (!usuario_id || !sala_id || !data) {
        return res.status(400).json({ error: 'usuario_id, sala_id e data são obrigatórios.' });
      }
  
      const queryCheck = 'SELECT * FROM reservas WHERE sala_id = ? AND data = ?';
      this.db.query(queryCheck, [sala_id, data], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
  
        if (results.length > 0) {
          return res.status(409).json({ error: 'Sala já reservada nesta data.' });
        }
  
        const queryInsert = 'INSERT INTO reservas (usuario_id, sala_id, data) VALUES (?, ?, ?)';
        this.db.query(queryInsert, [usuario_id, sala_id, data], (err2, results2) => {
          if (err2) {
            return res.status(500).json({ error: 'Erro ao salvar reserva.' });
          }
  
          res.status(201).json({ message: 'Reserva criada com sucesso!', reservaId: results2.insertId });
        });
      });
    }
  
    // Listar reservas
    listarReservas(req, res) {
      const query = `
        SELECT r.id, r.data, u.nome as usuario_nome, s.tipo as sala_tipo, s.descricao as sala_descricao
        FROM reservas r
        JOIN usuarios u ON r.usuario_id = u.id
        JOIN salas s ON r.sala_id = s.id
        ORDER BY r.data DESC
      `;
  
      this.db.query(query, (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao buscar reservas.' });
        }
  
        res.status(200).json(results);
      });
    }
  }
  
  module.exports = ReservaSalas;
  