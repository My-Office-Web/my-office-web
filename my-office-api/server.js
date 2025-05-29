import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SalasController from './controllers/SalasController.js';
import UsuariosController from './controllers/UsuariosController.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 

const instanciaSalas = new SalasController()
const instanciaUsuarios = new UsuariosController()

app.post('/usuarios', instanciaUsuarios.cadastrar);

app.post('/salas', instanciaSalas.cadastrar);

app.post('/login', instanciaUsuarios.login);


// Endpoint para listar salas
app.get('/salas', instanciaSalas.listar);

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
