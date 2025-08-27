const express = require("express");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 8080;

const app = express();

const Exercise = require("./models/exercise");
const TrainingPlan = require("./models/training_plan");
const PlanExercise = require("./models/plan_exercise");
const ClientTrainingPlan = require("./models/client_training_plan");
const Category = require("./models/category");
const ExerciseCategory = require("./models/exercise_category");
// const User = require("./models/user");
const ClientWorkoutLog = require("./models/client_workout_log");

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

// ClientTrainingPlan.belongsTo(User, {
//     foreignKey: "clientID",
//     as: "client",
//     allowNull: false,
// });
// User.hasMany(ClientTrainingPlan, { foreignKey: "clientID" });
// ClientTrainingPlan.belongsTo(TrainingPlan, {
//     foreignKey: "planID",
//     as: "plan",
//     allowNull: false,
// });
TrainingPlan.hasMany(ClientTrainingPlan, { foreignKey: "planID" });

// ClientWorkoutLog.belongsTo(User, {
//     foreignKey: "clientID",
//     as: "client",
//     allowNull: false,
// });
// User.hasMany(ClientWorkoutLog, { foreignKey: "clientID" });

Exercise.belongsToMany(Category, { through: ExerciseCategory, foreignKey: "exerciseId" });
Category.belongsToMany(Exercise, { through: ExerciseCategory, foreignKey: "categoryId" });

ClientWorkoutLog.belongsTo(TrainingPlan, {
    foreignKey: "planID",
    as: "plan",
    allowNull: false,
});
TrainingPlan.hasMany(ClientWorkoutLog, { foreignKey: "planID" });

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
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const trainerRoutes = require('./routes/trainer');
const planRoutes = require('./routes/plan');
const categoryRoutes = require('./routes/category_routes');
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", async (req, res) => {
    res.send("Hello world!");
});

app.use('/api/trainer', trainerRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});