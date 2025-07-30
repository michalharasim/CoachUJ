const sequelize = require('./db');
const User = require('./models/User');
const Invitation = require('./models/Invitation');
const ClientCoachLink = require('./models/ClientCoachLink');
const Message = require('./models/Message');

// Synchronizujemy modele z bazą danych
sequelize.sync({ force: false })  // force: true spowoduje, że tabele zostaną usunięte i utworzone na nowo
  .then(() => console.log('Modele zsynchronizowane z bazą danych'))
  .catch(err => console.error('Błąd synchronizacji modeli:', err));