const express = require("express");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 8080;

const app = express();

const Exercise = require("./models/exercise");
const TrainingPlan = require("./models/training_plan");
const PlanExercise = require("./models/plan_exercise");
const WorkoutLog = require("./models/workout_log");
const Category = require("./models/category");
const ExerciseCategory = require("./models/exercise_category");
// const User = require("./models/user");
const WorkoutLogExercise = require("./models/workout_log_exercise");

PlanExercise.belongsTo(Exercise, {
    foreignKey: "exerciseID",
    as: "exercise",
    allowNull: false,
});
Exercise.hasMany(PlanExercise, { foreignKey: "exerciseID" });

// Plan treningowy składa się z wielu ćwiczeń
TrainingPlan.hasMany(PlanExercise, { foreignKey: 'planID', as: 'exercises' });
PlanExercise.belongsTo(TrainingPlan, { foreignKey: 'planID' });

// Plan treningowy może być podstawą dla wielu sesji treningowych
TrainingPlan.hasMany(WorkoutLog, { foreignKey: 'planID', as: 'logs' });
WorkoutLog.belongsTo(TrainingPlan, { foreignKey: 'planID', as: "plan"});

// Sesja treningowa (WorkoutLog) składa się z wielu wykonanych ćwiczeń (WorkoutLogExercise)
WorkoutLog.hasMany(WorkoutLogExercise, { foreignKey: 'workoutLogID', as: 'loggedExercises' });
WorkoutLogExercise.belongsTo(WorkoutLog, { foreignKey: 'workoutLogID' });

// Ćwiczenie z planu (PlanExercise) może mieć wiele logów z różnych sesji
PlanExercise.hasMany(WorkoutLogExercise, { foreignKey: 'planExerciseID' });
WorkoutLogExercise.belongsTo(PlanExercise, { foreignKey: 'planExerciseID' });

Exercise.belongsToMany(Category, { through: ExerciseCategory, foreignKey: "exerciseId" });
Category.belongsToMany(Exercise, { through: ExerciseCategory, foreignKey: "categoryId" });

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