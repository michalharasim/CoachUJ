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
const TrainingPlan = require("./models/training_plan")(sequelize);
const PlanExercise = require("./models/plan_exercise")(sequelize);
const ClientTrainingPlan = require("./models/client_training_plan")(sequelize);
const User = require("./models/user")(sequelize);

// TODO: add coachID -> TrainingPlan when coach table is implemented
PlanExercise.belongsTo(Exercise, {
    foreignKey: "exerciseID",
    as: "exercise",
    allowNull: false,
});
Exercise.hasMany(PlanExercise, { foreignKey: "exerciseID" });
PlanExercise.belongsTo(TrainingPlan, {
    foreignKey: "planID",
    as: "plan_exercise",
    allowNull: false,
});
TrainingPlan.hasMany(PlanExercise, { foreignKey: "planID" });

ClientTrainingPlan.belongsTo(User, {
    foreignKey: "clientID",
    as: "client",
    allowNull: false,
});
User.hasMany(ClientTrainingPlan, { foreignKey: "clientID" });
ClientTrainingPlan.belongsTo(TrainingPlan, {
    foreignKey: "planID",
    as: "plan",
    allowNull: false,
});
TrainingPlan.hasMany(ClientTrainingPlan, { foreignKey: "planID" });

async function syncDatabase() {
    try {
		await sequelize.sync();
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

app.get("/api/trainer/plan/:id", async (req, res) => {
    // TODO: to samo pytanie co przy exercise
    trainer.getPlan(req, res, TrainingPlan, PlanExercise);
});

app.post("/api/trainer/plan", async (req, res) => {
    trainer.createPlan(req, res, TrainingPlan, PlanExercise, Exercise, sequelize);
});

app.put("/api/trainer/plan/:id", async (req, res) => {
    trainer.updatePlan(req, res, TrainingPlan, PlanExercise, sequelize);
});

app.post("/api/trainer/plan/:plan_id/:client_id", async (req, res) => {
    trainer.addPlanToClient(req, res, ClientTrainingPlan, TrainingPlan, User);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});