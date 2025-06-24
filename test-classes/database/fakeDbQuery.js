 const db = {
    promise: () => ({
      query: (sql, params) => {
        // Aqui você simula as respostas para as queries que seu código faz
        if (sql.includes('SELECT * FROM usuarios WHERE email = ?')) {
          if (params[0] === 'teste@email.com') {
            return Promise.resolve([[{ id_usuario: 1, nome: 'Teste', email: 'teste@email.com', senha: 'hashFake' }]]);
          }
          return Promise.resolve([[]]); // Não encontrou usuário
        }
        if (sql.includes('INSERT INTO usuarios')) {
          return Promise.resolve([{ insertId: 10 }]);
        }
        // Para outras queries retorne algo padrão
        return Promise.resolve([[]]);
      }
    })
  };
  module.exports = { db };