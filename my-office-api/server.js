import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SalasController from './controllers/SalasController.js';
import UsuariosController from './controllers/UsuariosController.js';
import ReservaSalas from './controllers/ReservaSalas.js';
import authenticateToken from './middlewares/auth.js'; // <--- Novo middleware



const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS (agora mais específica)
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições SOMENTE do seu front-end Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite os métodos HTTP necessários
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite os cabeçalhos necessários, incluindo o token
}));

app.use(bodyParser.json({ limit: '10mb' }));

const instanciaSalas = new SalasController();
const instanciaUsuarios = new UsuariosController();
const instanciaReservaSalas = new ReservaSalas();
const instanciaFavoritos = new FavoritosController(); // Instancie o novo controlador

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

// --- ROTAS DE FAVORITOS (ADICIONE AQUI) ---
app.get('/favorites', authenticateToken, instanciaFavoritos.listarFavoritos); // Listar favoritos
app.post('/favorites', authenticateToken, instanciaFavoritos.adicionarFavorito); // Adicionar favorito
app.delete('/favorites/:roomId', authenticateToken, instanciaFavoritos.removerFavorito); // Remover favorito
// --- FIM ROTAS DE FAVORITOS ---

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});