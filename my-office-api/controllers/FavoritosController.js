import db from "../database/ConexaoMySql.js";

class FavoritosController {
  
  // Adicionar favorito
  async adicionar(req, res) {
    const usuario_id = req.user.id;
    const { sala_id } = req.body;

    if (!sala_id) {
      return res.status(400).json({ error: "O campo sala_id é obrigatório." });
    }

    try {
      const [rows] = await db.promise().query(
        "SELECT * FROM favoritos WHERE usuario_id = ? AND sala_id = ?",
        [usuario_id, sala_id]
      );

      if (rows.length > 0) {
        return res.status(409).json({ error: "Sala já está nos favoritos." });
      }

      await db.promise().query(
        "INSERT INTO favoritos (usuario_id, sala_id) VALUES (?, ?)",
        [usuario_id, sala_id]
      );

      return res.status(201).json({ message: "Sala adicionada aos favoritos." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao adicionar favorito." });
    }
  }

  // Remover favorito
  async remover(req, res) {
    const usuario_id = req.user.id;
    const { sala_id } = req.body;

    if (!sala_id) {
      return res.status(400).json({ error: "O campo sala_id é obrigatório." });
    }

    try {
      const [result] = await db.promise().query(
        "DELETE FROM favoritos WHERE usuario_id = ? AND sala_id = ?",
        [usuario_id, sala_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Favorito não encontrado." });
      }

      return res.status(200).json({ message: "Favorito removido com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover favorito." });
    }
  }

  // Listar favoritos
  async listar(req, res) {
    const usuario_id = req.user.id;

    try {
      const [rows] = await db.promise().query(
        `
        SELECT 
          s.id_sala AS id,
          s.tipo,
          s.descricao,
          s.imagem,
          s.rua, s.numero, s.bairro, s.cidade, s.estado,
          s.preco,
          s.capacidade
        FROM favoritos f
        JOIN salas s ON f.sala_id = s.id_sala
        WHERE f.usuario_id = ?
        `,
        [usuario_id]
      );

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar favoritos." });
    }
  }

  // Verificar se uma sala é favorita
  async verificar(req, res) {
    const usuario_id = req.user.id;
    const sala_id = req.params.salaId;

    try {
      const [rows] = await db.promise().query(
        "SELECT * FROM favoritos WHERE usuario_id = ? AND sala_id = ?",
        [usuario_id, sala_id]
      );

      const favoritado = rows.length > 0;
      return res.status(200).json({ favoritado });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao verificar favorito." });
    }
  }
}

export default FavoritosController;
