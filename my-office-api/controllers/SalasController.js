import db from "../database/ConexaoMySql.js";


class SalasController {
    cadastrar (req, res) {
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
          usuario_id
        } = req.body;

        const query = `
        INSERT INTO salas 
        (cep, estado, cidade, bairro, rua, numero, preco, capacidade, tipo, descricao, imagem, latitude, longitude, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(
          query,
          [cep, estado, cidade, bairro, rua, numero, preco, capacidade, tipo, descricao, imagem, latitude, longitude, usuario_id],
          (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Erro ao salvar a sala' });
            }
            res.status(201).json({ id: results.insertId });
          }
        );
      }

    listar (req, res) {
        db.query('SELECT * FROM salas', (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao buscar salas' });
          }
          res.json(results);
        });
      }

    listarMinhasSalas (req, res) {
        const id = 1
        const query = `SELECT * FROM salas WHERE usuario_id = ?`
        
        db.query(query, [id], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao buscar salas' });
          }
          res.json(results);
        });
    }

  }

export default SalasController