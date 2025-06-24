class SalasController {
  constructor(db) {
    this.db = db;
  }

  cadastrar(req, res) {
    const {
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      preco,
      capacidade,
      tipo,
      descricao,
      imagem,
      latitude,
      longitude,
      usuario_id,
    } = req.body;

    const query = `
      INSERT INTO salas 
      (cep, estado, cidade, bairro, rua, numero, preco, capacidade, tipo, descricao, imagem, latitude, longitude, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    this.db.query(
      query,
      [
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        preco,
        capacidade,
        tipo,
        descricao,
        imagem,
        latitude,
        longitude,
        usuario_id,
      ],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao salvar a sala" });
        }
        res.status(201).json({ id: results.insertId });
      }
    );
  }

  listar(req, res) {
    this.db.query("SELECT * FROM salas", (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar salas" });
      }
      res.json(results);
    });
  }

  listarMinhasSalas(req, res) {
    const usuario_id = req.usuario.id; // Vindo do middleware authenticateToken
    const query = `SELECT * FROM salas WHERE usuario_id = ?`;

    this.db.query(query, [usuario_id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao buscar salas do usuário" });
      }
      res.json(results);
    });
  }

  editar(req, res) {
    const { id } = req.params;
    const {
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      preco,
      capacidade,
      tipo,
      descricao,
      imagem,
      latitude,
      longitude,
      usuario_id,
    } = req.body;

    const query = `
      UPDATE salas SET 
      cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, 
      preco = ?, capacidade = ?, tipo = ?, descricao = ?, imagem = ?, 
      latitude = ?, longitude = ?, usuario_id = ?
      WHERE id_sala = ?`;

    this.db.query(
      query,
      [
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        preco,
        capacidade,
        tipo,
        descricao,
        imagem,
        latitude,
        longitude,
        usuario_id,
        id,
      ],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao atualizar a sala" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Sala não encontrada" });
        }
        res.status(200).json({ message: "Sala atualizada com sucesso" });
      }
    );
  }

  excluir(req, res) {
    const { id } = req.params;
    const usuario_id = req.user.id;

    // Garante que o usuário só pode excluir salas que ele mesmo criou
    const query = `DELETE FROM salas WHERE id_sala = ? AND usuario_id = ?`;

    this.db.query(query, [id, usuario_id], (err, results) => {
      if (err) {
        console.error("Erro ao excluir sala:", err);
        return res.status(500).json({ error: "Erro ao excluir sala" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Sala não encontrada ou não pertence ao usuário" });
      }

      res.status(200).json({ message: "Sala excluída com sucesso" });
    });
  }
}

module.exports = SalasController;
