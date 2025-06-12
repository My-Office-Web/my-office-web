import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SalasController from './controllers/SalasController.js';
import UsuariosController from './controllers/UsuariosController.js';
import ReservaSalas from './controllers/ReservaSalas.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const instanciaSalas = new SalasController();
const instanciaUsuarios = new UsuariosController();
const instanciaReservaSalas = new ReservaSalas(); 

app.post('/usuarios', instanciaUsuarios.cadastrar);
app.post('/salas', instanciaSalas.cadastrar);
app.post('/login', instanciaUsuarios.login);

// // Rotas para reservas
app.post('/reservas', instanciaReservaSalas.criarReserva.bind(instanciaReservaSalas));
app.get('/reservas', (req, res) => instanciaReservaSalas.listarReservas(req, res)); 

// Endpoint para listar salas
app.get('/salas', instanciaSalas.listar);

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
