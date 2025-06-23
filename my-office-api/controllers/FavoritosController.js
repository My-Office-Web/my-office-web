import db from "../database/ConexaoMySql.js";

class FavoritosController {
  listar(req, res) {
    const usuario_id = req.usuario.id;

    const query = `
      SELECT f.id_favorito, s.*
      FROM favoritos f
      INNER JOIN salas s ON f.sala_id = s.id_sala
      WHERE f.usuario_id = ?
    `;

    db.query(query, [usuario_id], (err, results) => {
      if (err) {
        console.error("Erro ao buscar favoritos:", err);
        return res.status(500).json({ error: "Erro ao buscar favoritos" });
      }
      res.status(200).json(results);
    });
  }

  adicionar(req, res) {
    const usuario_id = req.usuario.id;
    const { sala_id } = req.body;

    if (!sala_id) {
      return res.status(400).json({ error: "sala_id é obrigatório" });
    }

    const query = "INSERT INTO favoritos (usuario_id, sala_id) VALUES (?, ?)";

    db.query(query, [usuario_id, sala_id], (err, results) => {
      if (err) {
        console.error("Erro ao adicionar favorito:", err);
        return res.status(500).json({ error: "Erro ao adicionar favorito" });
      }
      res.status(201).json({ id_favorito: results.insertId });
    });
  }

  remover(req, res) {
    const usuario_id = req.usuario.id;
    const { sala_id } = req.body;

    if (!sala_id) {
      return res.status(400).json({ error: "sala_id é obrigatório" });
    }

    const query = "DELETE FROM favoritos WHERE usuario_id = ? AND sala_id = ?";

    db.query(query, [usuario_id, sala_id], (err, results) => {
      if (err) {
        console.error("Erro ao remover favorito:", err);
        return res.status(500).json({ error: "Erro ao remover favorito" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Favorito não encontrado" });
      }

      res.status(200).json({ message: "Favorito removido com sucesso" });
    });
  }
}

export default FavoritosController;
