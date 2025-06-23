import mysql from 'mysql2';

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    dateStrings: true,
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      process.exit(1);
    }
    db.query("SET time_zone = '-03:00'")  
    console.log('Conectado ao MySQL!');
  });

  export default db;