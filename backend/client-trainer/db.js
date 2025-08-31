const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './client-trainer.db',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Połączono z bazą danych SQLite'))
  .catch(err => console.error('Błąd połączenia z bazą danych:', err));

module.exports = sequelize;