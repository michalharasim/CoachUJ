const express = require("express");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const port = 8080;

const app = express();

const trainer = require("./server/trainer.js");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.db",
});

const Exercise = require("./models/exercise")(sequelize);

async function syncDatabase() {
    try {
		await sequelize.sync({ alter: true });
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Error connecting to the database:', error);
	}
}

syncDatabase();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.send("Hello world!");
});

app.get("/api/trainer/exercise/:id", async(req, res) => {
    // TODO: czy chcemy, żeby klient mógł zobaczyć dane ćwiczenie
    // pod endpointem /api/trainer/exercise/:id
    // czy pod /api/exercise/:id ???
    trainer.getExercise(req, res, Exercise);
});

app.post("/api/trainer/exercise", async (req, res) => {
    // TODO: check if request comes from trainer
    trainer.addExercise(req, res, Exercise);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});