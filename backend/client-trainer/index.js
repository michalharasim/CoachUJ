const express = require('express');
const app = express();
const PORT = 2137;
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, '..', 'Authorization', 'uploads')));

const trainerRoutes = require('./routes/trainers');
const invitationRoutes = require('./routes/invitations');
const connectionRoutes = require('./routes/connections');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');

app.use('/api/trainers', trainerRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

require('./syncModels');

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});