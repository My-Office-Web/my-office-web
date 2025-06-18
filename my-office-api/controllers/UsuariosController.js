import db from "../database/ConexaoMySql.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

class UsuariosController {
  async cadastrar(req, res) {
    const { nome, email, senha, telefone } = req.body;

    // Corrigido: telefone deve ser opcional? Se não, remova o !telefone abaixo
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
      // Verifica se o email já existe
      const [result] = await db.promise().query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
      if (result.length > 0) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const insertQuery = `INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)`;
      const [insertResult] = await db.promise().query(insertQuery, [nome, email, senhaHash, telefone || null]);

      res.status(201).json({ id: insertResult.insertId, message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
      const [results] = await db.promise().query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const usuario = results[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        token,
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (err) {
      console.error('Erro no login:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

export default UsuariosController;
