import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    password: 'senai',     
    database: 'salasdb',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      process.exit(1);
    }
    console.log('Conectado ao MySQL!');
  });

  export default db;