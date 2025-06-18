import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

    req.user = user;
    next();
  });
}

//como usar  uma rota protegida

// import authenticateToken from './middlewares/auth.js';

// app.get('/rota-protegida', authenticateToken, (req, res) => {
//   res.json({ mensagem: `Olá, ${req.user.nome}! Acesso autorizado.` });
// });


export default authenticateToken;
