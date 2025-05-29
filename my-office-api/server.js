const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // para receber imagens base64 grandes

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Altere se necessário
  password: 'senai',     // Altere se necessário
  database: 'salasdb',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL!');
});

// Endpoint para cadastrar usuário com senha em MD5
app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const senhaMD5 = crypto.createHash('md5').update(senha).digest('hex');

  const query = `INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)`;

  db.query(query, [nome, email, senhaMD5], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json({ id: results.insertId });
  });
});


// Endpoint para cadastrar sala
app.post('/salas', (req, res) => {
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
  } = req.body;

  const query = `
    INSERT INTO salas 
    (cep, estado, cidade, bairro, rua, numero, preco, capacidade, tipo, descricao, imagem)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [cep, estado, cidade, bairro, rua, numero, preco, capacidade, tipo, descricao, imagem],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao salvar a sala' });
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});


// Endpoint de login de usuário com senha em MD5
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const senhaMD5 = crypto.createHash('md5').update(senha).digest('hex');

  const query = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;

  db.query(query, [email, senhaMD5], (err, results) => {
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
});


// Endpoint para listar salas
app.get('/salas', (req, res) => {
  db.query('SELECT * FROM salas', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar salas' });
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
