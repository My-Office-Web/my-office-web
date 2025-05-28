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
