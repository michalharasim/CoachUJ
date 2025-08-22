const sequelize = require('./db');
const User = require('./models/User');
const Invitation = require('./models/Invitation');
const ClientCoachLink = require('./models/ClientCoachLink');
const Message = require('./models/Message');

User.hasMany(Invitation, { foreignKey: 'inviterID', as: 'sentInvitations' });
Invitation.belongsTo(User, { foreignKey: 'inviterID', as: 'inviter' });

User.hasMany(Invitation, { foreignKey: 'inviteeID', as: 'receivedInvitations' });
Invitation.belongsTo(User, { foreignKey: 'inviteeID', as: 'invitee' });

// Relacje klient ↔ trener (przez tabelę ClientCoachLink)
User.hasMany(ClientCoachLink, { foreignKey: 'coachID', as: 'coachLinks' });
User.hasMany(ClientCoachLink, { foreignKey: 'clientID', as: 'clientLinks' });

ClientCoachLink.belongsTo(User, { foreignKey: 'coachID', as: 'coach' });
ClientCoachLink.belongsTo(User, { foreignKey: 'clientID', as: 'client' });

// Synchronizujemy modele z bazą danych
sequelize.sync({ force: false })  // force: true spowoduje, że tabele zostaną usunięte i utworzone na nowo
  .then(() => console.log('Modele zsynchronizowane z bazą danych'))
  .catch(err => console.error('Błąd synchronizacji modeli:', err));