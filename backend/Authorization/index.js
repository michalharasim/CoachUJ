const express = require("express");
const sequelize = require('./db');
const bodyParser = require("body-parser");
const authRoute = require('./routes/authRoute');
const cors = require('cors');
const port = 2000;

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Connection with database established successfully.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

syncDatabase();
app.use(bodyParser.json());
app.use('/', authRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});