const { serverError } = require("../helpers");
const WorkoutLogExercise = require('../../models/workout_log_exercise');
const TrainingPlan = require('../../models/training_plan');
const WorkoutLog = require('../../models/workout_log');
const PlanExercise = require('../../models/plan_exercise');
const Exercise = require('../../models/exercise');
const Category = require('../../models/category');
const sequelize = require("../../db");
const { Sequelize} = require("sequelize");


async function getTrainerClientPlanWithLogs(req, res) {
    try {
        const { plan_id } = req.params;
        const clientID = parseInt(req.params.clientID, 10)
        if (isNaN(clientID)) {
            return res.status(400).json({ message: "Invalid client ID format." });
        }
        const planWithLogs = await TrainingPlan.findOne({
            where: { id: plan_id },
            include: [
                {
                    model: PlanExercise,
                    as: 'exercises',
                    include: [
                        {
                            model: Exercise,
                            as: 'exercise',
                            attributes: ['name', 'description', 'picture'],
                            include: [
                                {
                                    model: Category,
                                    attributes: ['name'],
                                    through: { attributes: [] }
                                }
                            ]

                        }
                    ]

                },
                {
                    // Dołącz wszystkie sesje treningowe dla tego planu i klienta
                    model: WorkoutLog,
                    as: 'logs',
                    where: { clientID: clientID },
                    required: false,
                    include: [
                        {
                            // Do każdej sesji dołącz wykonane ćwiczenia
                            model: WorkoutLogExercise,
                            as: 'loggedExercises',
                        }
                    ]
                }
            ],
            order: [
                [{ model: PlanExercise, as: 'exercises' }, 'order', 'ASC']
            ]
        });
        if (!planWithLogs) {
            return res.status(404).json({ message: "Plan not found" });
        }

        res.status(200).json(planWithLogs);

    } catch (error) {
        console.error("Error fetching plan with logs:", error);
        res.status(500).json({ message: "Server error" });
    }
}


async function getClientPlanWithLogs(req, res) {
    try {
        const clientID = req.user_id;
        const { plan_id } = req.params;

        const planWithLogs = await TrainingPlan.findOne({
            where: { id: plan_id },
            include: [
                {
                    // Dołącz ćwiczenia zdefiniowane w planie
                    model: PlanExercise,
                    as: 'exercises',
                    include: [
                        {
                            model: Exercise,
                            as: 'exercise', // Używamy aliasu z definicji relacji
                            attributes: ['name', 'description', 'picture'], // Pobieramy potrzebne dane
                            include: [
                                {
                                    model: Category,
                                    attributes: ['name'], // Pobieramy tylko nazwę kategorii
                                    through: { attributes: [] }
                                }
                            ]

                        }
                    ]

                },
                {
                    // Dołącz wszystkie sesje treningowe dla tego planu i klienta
                    model: WorkoutLog,
                    as: 'logs',
                    where: { clientID: clientID },
                    required: false, // `false` aby plan został zwrócony nawet bez logów
                    include: [
                        {
                            // Do każdej sesji dołącz wykonane ćwiczenia
                            model: WorkoutLogExercise,
                            as: 'loggedExercises',
                        }
                    ]
                }
            ],
            order: [
                // Poprawne sortowanie zagnieżdżonych modeli
                [{ model: PlanExercise, as: 'exercises' }, 'order', 'ASC']
            ]
        });

        if (!planWithLogs) {
            return res.status(404).json({ message: "Plan not found" });
        }

        res.status(200).json(planWithLogs);

    } catch (error) {
        console.error("Error fetching plan with logs:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function saveWorkoutLog(req, res) {
    const clientID = req.user_id;
    if (!clientID) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const {notes, exercises, logID } = req.body;

    const t = await sequelize.transaction();

    try {
        // Stwórz główny rekord sesji treningowej (WorkoutLog).
        const workout = await WorkoutLog.findOne({
            where: {
                id: logID,
            },
            transaction: t,
        })

        if(!workout) {
            return res.status(404).json({
                success: false,
                error: "Workout with given id doesnt exist",
            });

        }

        workout.update({
            notes: notes
        }, {
            transaction: t,
        })

        const logExercisesData = exercises.map(exercise => {
            // Upewniamy się, że przesyłamy tylko potrzebne dane
            return {
                id: exercise.id,
                planExerciseID: exercise.planExerciseID,
                actualReps: exercise.actualReps,
                actualWeight: exercise.actualWeight,
                breakTime: exercise.actualBreakTime,
                workoutLogID: logID,
            };
        });

        // Zapisz wszystkie wykonane ćwiczenia w jednej operacji
        await WorkoutLogExercise.bulkCreate(logExercisesData, {
            // które pola mają być zaktualizowane w razie znalezienia duplikatu
            updateOnDuplicate: ["actualReps", "actualWeight", "breakTime"],
            transaction: t
        });

        // W tym momencie zmiany zostaną trwale zapisane w bazie danych.
        await t.commit();

        res.status(201).json({
            success: true,
            message: "Workout log created successfully!",
            logId: workout.id
        });

    } catch (error) {
        await t.rollback();
        return serverError(res, "Failed to create workout log.", error);
    }
}

const getPlan = async (req, res) => {
    const clientID = req.user_id;
    try {
        const clientPlan = await WorkoutLog.findOne({
            where: {
                clientID: clientID,
            },
        });

        if (clientPlan === null) {
            return res.status(404).json({
                success: false,
                error: "Client with given id doesnt exist",
            });
        }
        const planID = clientPlan.planID;
        const plan = await TrainingPlan.findOne({
            where: {
                id: planID,
            },
        });

        if (plan === null) {
            return res.status(404).json({
                success: false,
                error: "Plan with given id doesnt exist",
            });
        }
        return res.status(200).json({
            succes: true,
            planName: plan.name,
            coachId: plan.coachID,
        });
    } catch (error) {
        return serverError(res, "Error on get plan:", error);
    }
};

const getClientPlans = async (req, res) => {
    let clientID = req.user_id;
    if (req.params.clientID){
        clientID = req.params.clientID;
    }

    try {
        const plans = await WorkoutLog.findAll({
            where: { clientID },
            include: [
                {
                    model: TrainingPlan,
                    as: "plan",
                    attributes: ["id", "name", "coachID"],
                },
            ],
            attributes: ["createdAt"],
        });

        const flatPlans = plans.map(p => {
            const plain = p.get({ plain: true });
            return {
                id: plain.plan.id,
                name: plain.plan.name,
                coachID: plain.plan.coachID,
                date: plain.createdAt,
            };
        });

        return res.status(200).json({
            success: true,
            plans: flatPlans
        });
    } catch (error) {
        return serverError(res, "Error fetching trainer plans:", error);
    }
}

// Plany konkretnego trenera dla klienta
const getTrainerClientPlans = async (req, res) => {
    const clientID = req.params.clientID;
    const trainerID = req.user_id;

    try {
        const plans = await WorkoutLog.findAll({
            where: { clientID },
            include: [
                {
                    model: TrainingPlan,
                    as: "plan",
                    where: {
                        coachID: trainerID
                    },
                    attributes: ["id", "name", "coachID"],
                },
            ],
            attributes: ["createdAt"], // data przypisania klientowi
        });

        const flatPlans = plans.map(p => {
            const plain = p.get({ plain: true });
            return {
                id: plain.plan.id,
                name: plain.plan.name,
                coachID: plain.plan.coachID,
                date: plain.createdAt,
            };
        });

        return res.status(200).json({
            success: true,
            plans: flatPlans
        });
    } catch (error) {
        return serverError(res, "Error fetching trainer plans:", error);
    }
}

module.exports = {
    getClientPlanWithLogs,
    saveWorkoutLog,
    getPlan,
    getClientPlans,
    getTrainerClientPlans,
    getTrainerClientPlanWithLogs,
}