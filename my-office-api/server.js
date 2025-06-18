import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SalasController from './controllers/SalasController.js';
import UsuariosController from './controllers/UsuariosController.js';
import ReservaSalas from './controllers/ReservaSalas.js';
import authenticateToken from './middlewares/auth.js'; // <--- Novo middleware

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const instanciaSalas = new SalasController();
const instanciaUsuarios = new UsuariosController();
const instanciaReservaSalas = new ReservaSalas(); 

// Cadastro e login de usuários (público)
app.post('/usuarios', instanciaUsuarios.cadastrar);
app.post('/login', instanciaUsuarios.login);

// Cadastro de salas (protegido)
app.post('/salas', authenticateToken, instanciaSalas.cadastrar);

// Reservas (protegidas)
app.post('/reservas', authenticateToken, instanciaReservaSalas.criarReserva.bind(instanciaReservaSalas));
app.get('/reservas', authenticateToken, (req, res) => instanciaReservaSalas.listarReservas(req, res)); 

// Listagem de salas (público)
app.get('/salas', instanciaSalas.listar);

// Listagem de salas do usuário logado (protegido)
app.get('/minhas-salas', authenticateToken, instanciaSalas.listarMinhasSalas);

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
