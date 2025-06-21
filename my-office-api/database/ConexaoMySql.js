import mysql from 'mysql2';

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "3307",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PWD || "17527530",
    database: process.env.MYSQL_DB || "salasdb",
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no MySQL:', err);
      process.exit(1);
    }
    console.log('Conectado ao MySQL!');
  });

  export default db;