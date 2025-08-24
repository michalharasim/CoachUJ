const { Sequelize } = require("sequelize");
const { serverError } = require("../helpers");
const Exercise = require('../../models/exercise');
const TrainingPlan = require('../../models/training_plan');
const PlanExercise = require('../../models/plan_exercise');
const User = require('../../models/user');
const sequelize = require('../../db');

const getExercise = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const id = req.params.id;
    try {
        const exercise = await Exercise.findOne({
            where: {
                [Sequelize.Op.or]: [ {id} ],
            }
        });
        if (exercise) {
            return res.status(200).json({
                success: true,
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                picture: exercise.picture,
                coachID: exercise.coachID,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Exercise with that id doesnt exist",
            });
        }
    } catch (error) {
        return serverError(res, "Error on get exercise:", error);
    }
};

const addExercise = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const { name, description, picture, coachID } = req.body;
    try {
        const existingExercise = await Exercise.findOne({
            where: {
                [Sequelize.Op.or]: [{ name }],
            }
        });

        if (existingExercise) {
            return res.status(409).json({
                success: false,
                error: "Exercise of that name already exists",
            });
        }

        const newExercise = await Exercise.create({
            name,
            description,
            picture,
            coachID,
        });
        return res.status(201).json({
            success: true,
            id: newExercise.id,
            name: name,
            description: description,
            picture: picture,
            coachID: coachID,
        });
    } catch (error) {
        return serverError(res, "Error during add exercise:", error);
    }
};

const getPlan = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const planID = req.params.id;
    try {
        const trainingPlan = await TrainingPlan.findOne({
            where: {
                id: planID,
            }
        });
        const planExercises = await PlanExercise.findAll({
            where: {
                planID: planID,
            }
        });
        if (trainingPlan && planExercises) {
            const shortenPlanExercises = planExercises.map(obj => {
                const {exerciseID, setCount, repCount, breakTime, notes, weight, order} = obj;
                return {exerciseID, setCount, repCount, breakTime, notes, weight, order};
            });
            return res.status(200).json({
                success: true,
                name: trainingPlan.name,
                coachID: trainingPlan.coachID,
                exercises: shortenPlanExercises,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Plan with that id doesnt exist",
            });
        }
    } catch (error) {
        return serverError(res, "Error during get plan:", error);
    }
};

const createPlan = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const { name, coachID, exercises } = req.body;
    const t = await sequelize.transaction();
    try {
        const trainingPlan = await TrainingPlan.create(
            {
                name: name,
                coachID: coachID,
            },
            { transaction: t },
        );
        const trainingPlanID = trainingPlan.id;
        for (e of exercises) {
            const exercise = await Exercise.findOne({
                where: {
                    id: e.exerciseID,
                }
            });
            if (exercise === null) {
                await t.rollback();
                return res.status(404).json({
                    success: false,
                    error: `Exercise with id ${e.exerciseID} doesnt exist`,
                })
            }

            await PlanExercise.create(
                {
                    setCount: e.setCount,
                    repCount: e.repCount,
                    breakTime: e.breakTime,
                    notes: e.notes,
                    weight: e.weight,
                    order: e.order,
                    planID: trainingPlanID,
                    exerciseID: e.exerciseID,
                },
                { transaction: t },
            );
        }
        await t.commit();
        return res.status(201).json({
            success: true,
            planID: trainingPlanID,
            planName: name,
            exercisesNum: exercises.length,
        });
    } catch (error) {
        await t.rollback();
        return serverError(res, "Error during create plan:", error);
    }
};

const updatePlan = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const planID = req.params.id;
    const exercises = req.body;
    
    if (!Array.isArray(exercises) || exercises.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Request body must be a non-empty array of exercise updates.'
        });
    }

    const t = await sequelize.transaction();
    try {
        updatedRecords = 0;
        const plan = await TrainingPlan.findOne({
            where: {
                id: planID,
            }
        });
        if (plan === null) {
            return res.status(404).json({
                success: false,
                error: `Plan with id ${planID} doesnt exist`,
            })
        }

        for (const e of exercises) {
            if (e.exerciseID === undefined || e.exerciseID === null) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    error: 'Each update object must contain an "exerciseID" field.'
                });
            }
            const {exerciseID, ...fields} = e;
            const [rowsAffected, updatedExercises] = await PlanExercise.update(fields, {
                where: {
                    planID: planID,
                    exerciseID: exerciseID,
                },
                returning: true,
                transaction: t,
            });

            if (rowsAffected !== 0) {
                updatedRecords += 1;
            }
        }
        await t.commit();
        return res.status(200).json({
            success: true,
            updatedCount: updatedRecords,
        });
    } catch (error) {
        await t.rollback();
        return serverError(res, "Error during update plan:", error);
    }
};

const addPlanToClient = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const planID = req.params.plan_id;
    const clientID = req.params.client_id;
    try {
        const plan = await TrainingPlan.findOne({
            where: {
                id: planID,
            },
        });
        const client = await User.findOne({
            where: {
                id: clientID,
            },
        });
        if (plan === null || client === null) {
            return res.status(404).json({
                success: false,
                error: "Plan or client with given id not found",
            });
        }
        await ClientTrainingPlan.create({
            planID: planID,
            clientID: clientID,
        });
        return res.status(201).json({
            success: true,
            planID: planID,
            clientID: clientID,
        });
    } catch (error) {
        return serverError(res, "Error during add plan to client:", error);
    }
};

module.exports = {
    addExercise,
    getExercise,
    createPlan,
    getPlan,
    updatePlan,
    addPlanToClient,
};