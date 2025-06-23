import db from "../database/ConexaoMySql.js";

class ReservaSalas {
  
  criarReserva(req, res) {
    const { sala_id, data } = req.body;
    const usuario_id = req.user.id;

    if (!usuario_id || !sala_id || !data) {
      return res.status(400).json({ error: "sala_id e data são obrigatórios." });
    }

    const queryCheck = "SELECT * FROM reservas WHERE sala_id = ? AND data = ?";
    db.query(queryCheck, [sala_id, data], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro interno do servidor." });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: "Sala já reservada nesta data." });
      }

      const queryInsert = "INSERT INTO reservas (usuario_id, sala_id, data) VALUES (?, ?, ?)";
      db.query(queryInsert, [usuario_id, sala_id, data], (err2, results2) => {
        if (err2) {
          return res.status(500).json({ error: "Erro ao salvar reserva." });
        }

        return res.status(201).json({
          message: "Reserva criada com sucesso!",
          reservaId: results2.insertId,
        });
      });
    });
  }

  listarReservas(req, res) {
    const idUsuario = req.user.id;

    const query = `
      SELECT 
        r.id_reserva AS id,
        r.data,
        s.tipo AS sala_tipo,
        s.descricao AS sala_descricao,
        s.imagem AS sala_imagem,
        s.rua, s.numero, s.bairro, s.cidade, s.estado, s.preco, s.capacidade
      FROM reservas r
      JOIN salas s ON r.sala_id = s.id_sala
      WHERE r.usuario_id = ?
      ORDER BY r.data DESC
    `;

    db.query(query, [idUsuario], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar reservas." });
      }

      return res.status(200).json(results);
    });
  }

  atualizarReserva(req, res) {
    const idReserva = req.params.id;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "A nova data é obrigatória." });
    }

    const querySala = "SELECT sala_id FROM reservas WHERE id_reserva = ?";
    db.query(querySala, [idReserva], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro interno do servidor." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      const salaId = results[0].sala_id;

      const queryCheck = `
        SELECT * FROM reservas 
        WHERE sala_id = ? AND data = ? AND id_reserva != ?
      `;

      db.query(queryCheck, [salaId, data, idReserva], (err2, results2) => {
        if (err2) {
          return res.status(500).json({ error: "Erro interno do servidor." });
        }

        if (results2.length > 0) {
          return res.status(409).json({ error: "Sala já reservada nesta data." });
        }

        const queryUpdate = "UPDATE reservas SET data = ? WHERE id_reserva = ?";
        db.query(queryUpdate, [data, idReserva], (err3, results3) => {
          if (err3) {
            return res.status(500).json({ error: "Erro ao atualizar reserva." });
          }

          if (results3.affectedRows === 0) {
            return res.status(404).json({ error: "Reserva não encontrada." });
          }

          return res.status(200).json({ message: "Reserva atualizada com sucesso." });
        });
      });
    });
  }

  excluirReserva(req, res) {
    const id = req.params.id;

    const queryDelete = "DELETE FROM reservas WHERE id_reserva = ?";
    db.query(queryDelete, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao excluir reserva." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      return res.status(200).json({ message: "Reserva excluída com sucesso." });
    });
  }
}

export default ReservaSalas;
