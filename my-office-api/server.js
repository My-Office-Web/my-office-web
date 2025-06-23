import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authenticateToken from './middlewares/auth.js';
import UsuariosController from './controllers/UsuariosController.js';
import SalasController from './controllers/SalasController.js';
import ReservaSalas from './controllers/ReservaSalas.js';
import FavoritosController from './controllers/FavoritosController.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const instanciaSalas = new SalasController();
const instanciaUsuarios = new UsuariosController();
const instanciaReservaSalas = new ReservaSalas();
const instanciaFavoritos = new FavoritosController();

// Rotas públicas
app.post('/usuarios', instanciaUsuarios.cadastrar.bind(instanciaUsuarios));
app.post('/login', instanciaUsuarios.login.bind(instanciaUsuarios));
app.get('/salas', instanciaSalas.listar.bind(instanciaSalas));

// Rotas protegidas (com JWT)
app.post('/salas', authenticateToken, instanciaSalas.cadastrar.bind(instanciaSalas));
app.put('/salas/:id', authenticateToken, instanciaSalas.editar.bind(instanciaSalas));
app.delete('/salas/:id', authenticateToken, instanciaSalas.excluir.bind(instanciaSalas));
app.get('/minhas-salas', authenticateToken, instanciaSalas.listarMinhasSalas.bind(instanciaSalas));

// Rotas de reservas protegidas
app.post('/reservas', authenticateToken, instanciaReservaSalas.criarReserva.bind(instanciaReservaSalas));
app.get('/reservas', authenticateToken, instanciaReservaSalas.listarReservas.bind(instanciaReservaSalas));
app.put('/reservas/:id', authenticateToken, instanciaReservaSalas.atualizarReserva.bind(instanciaReservaSalas));   // <== rota para atualizar reserva
app.delete('/reservas/:id', authenticateToken, instanciaReservaSalas.excluirReserva.bind(instanciaReservaSalas)); // <== rota para excluir reserva

// Rotas de favoritos (protegidas)
app.get('/favoritos', authenticateToken, instanciaFavoritos.listar.bind(instanciaFavoritos));
app.post('/favoritos', authenticateToken, instanciaFavoritos.adicionar.bind(instanciaFavoritos));
app.delete('/favoritos', authenticateToken, instanciaFavoritos.remover.bind(instanciaFavoritos));
app.get('/favoritos/:salaId', authenticateToken, instanciaFavoritos.verificar.bind(instanciaFavoritos));

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
