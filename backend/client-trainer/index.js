const express = require('express');
const app = express();
const PORT = 2137;

app.use(express.json());

const trainerRoutes = require('./routes/trainers');
const invitationRoutes = require('./routes/invitations');
const connectionRoutes = require('./routes/connections');
const messageRoutes = require('./routes/messages');

app.use('/api/trainers', trainerRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/messages', messageRoutes);

require('./syncModels');  // Synchronizowanie modeli z bazą danych

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});