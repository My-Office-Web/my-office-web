import db from "../database/ConexaoMySql.js";

class UsuariosController {
    cadastrar (req, res) {
        const { nome, email, senha } = req.body;
      
        if (!nome || !email || !senha) {
          return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
      
        const query = `INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, md5(?), ?)`;
      
        db.query(query, [nome, email, senha], (err, results) => {
          if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(400).json({ error: 'E-mail já cadastrado' });
            }
            return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
          }
          res.status(201).json({ id: results.insertId });
        });
      }

    login (req, res) {
        const { email, senha } = req.body;
      
        if (!email || !senha) {
          return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
      
        const query = `SELECT * FROM usuarios WHERE email = ? AND senha = md5(?)`;
      
        db.query(query, [email, senha], (err, results) => {
          if (err) {
            console.error('Erro no login:', err);
            return res.status(500).json({ error: 'Erro ao tentar fazer login' });
          }
      
          if (results.length === 0) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
          }
      
          const usuario = results[0];
          res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            usuario: {
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email,
            },
          });
        });
      }
}

export default UsuariosController