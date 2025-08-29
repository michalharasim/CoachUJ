const { Sequelize, Op} = require("sequelize");
const { serverError } = require("../helpers");
const Exercise = require('../../models/exercise');
const TrainingPlan = require('../../models/training_plan');
const PlanExercise = require('../../models/plan_exercise');
const Category = require('../../models/category');
const ExerciseCategory = require('../../models/exercise_category');
// const User = require('../../models/user');
const ClientTrainingPlan = require('../../models/client_training_plan');
const sequelize = require('../../db');

const getExercise = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({error: 'Access denied'});
    }
    const id = req.params.id;
    try {
        const exercise = await Exercise.findOne({
            where: { id },
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });
        if (exercise) {
            const exerciseData = {
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                picture: exercise.picture,
                coachID: exercise.coachID,
                categories: exercise.Categories?.map(c => ({ id: c.id, name: c.name })) || []
            };

            return res.json(exerciseData);
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
    const { name, description, categories} = req.body;
    const coachID = req.user_id;
    try {
        const existingExercise = await Exercise.findOne({
            where: { name }
        });

        if (existingExercise) {
            return res.status(409).json({
                success: false,
                error: "Exercise of that name already exists",
            });
        }

        let picturePath = null;
        if (req.file) {
            picturePath = `/uploads/${req.file.filename}`;
        }

        const newExercise = await Exercise.create({
            name,
            description,
            picture: picturePath,
            coachID,
        });

        // powiązane kategorie
        if (categories) {
            const categoryIds = Array.isArray(categories) ? categories : [categories];

            const exerciseCategories = categoryIds.map(id => ({
                exerciseId: newExercise.id,
                categoryId: Number(id), // konwertujemy na number
            }));

            await ExerciseCategory.bulkCreate(exerciseCategories);
        }

        return res.status(201).json({
            success: true,
            id: newExercise.id,
            name: name,
            description: description,
            picture: picturePath ,
            coachID: coachID,
        });
    } catch (error) {
        return serverError(res, "Error during add exercise:", error);
    }
};

const getPlan = async (req, res) => {
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
        const allExercises = await Exercise.findAll();
        if (trainingPlan && planExercises) {
            const shortenPlanExercises = planExercises.map(obj => {
                const {exerciseID, setCount, repCount, breakTime, notes, weight, order} = obj;

                const foundExercise = allExercises.find(ex => ex.id === exerciseID);

                const name = foundExercise ? foundExercise.name : '';

                return {exerciseID, setCount, repCount, breakTime, notes, weight, order, name};
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
    const { name, exercises, note } = req.body;
    const coachID = req.user_id;
    const t = await sequelize.transaction();
    try {
        const trainingPlan = await TrainingPlan.create(
            {
                name: name,
                coachID: coachID,
                note: note,
            },
            { transaction: t },
        );
        const trainingPlanID = trainingPlan.id;
        for (e of exercises) {
            const exercise = await Exercise.findOne({
                where: {
                    id: e.exercise.id,
                }
            });
            if (exercise === null) {
                await t.rollback();
                return res.status(404).json({
                    success: false,
                    error: `Exercise with id ${e.exercise.id} doesnt exist`,
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
                    exerciseID: e.exercise.id,
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
    const {exercises, note, name} = req.body;

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

        await plan.update({
            name: name ?? plan.name,
            note: note ?? plan.note,
        }, {transaction: t});

        const existingPlanExercises = await PlanExercise.findAll({
            where: { planID: planID },
            transaction: t,
        });
        const incomingExerciseIds = new Set(exercises.map(e => e.exercise.id));

        for (const e of exercises) {
            if (e.exercise.id === undefined || e.exercise.id  === null) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    error: 'Each update object must contain an "exerciseID" field.'
                });
            }
            const existingRecord = await PlanExercise.findOne({
                where: {
                    planID: planID,
                    exerciseID: e.exercise.id ,
                },
                transaction: t
            });

            const commonFields = {
                setCount: e.setCount,
                repCount: e.repCount,
                weight: e.weight,
                breakTime: e.breakTime,
                order: e.order,
            };

            if (existingRecord) {
                // Rekord istnieje, więc go aktualizujemy
                await existingRecord.update(commonFields, { transaction: t });
            } else {
                // Rekord nie istnieje, więc go tworzymy
                await PlanExercise.create({
                    ...commonFields,
                    planID: planID,
                    exerciseID: e.exercise.id,
                }, { transaction: t });
            }
        }

        // Pętla do usuwania rekordów, które zostały usunięte z planu na froncie
        for (const existingExercise of existingPlanExercises) {
            if (!incomingExerciseIds.has(existingExercise.exerciseID)) {
                await existingExercise.destroy({ transaction: t });
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
        return res.status(401).json({ error: 'Access denied' });
    }

    const planID = req.params.plan_id;
    const clientID = req.params.client_id;
    const trainerID = req.user_id;

    try {
        const plan = await TrainingPlan.findOne({
            where: {
                id: planID,
                coachID: trainerID,
            },
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                error: "Plan not found or does not belong to this trainer",
            });
        }

        await ClientTrainingPlan.create({
            planID: planID,
            clientID: clientID,
        });

        return res.status(201).json({
            success: true,
            message: "Plan successfully added to client",
            planID: planID,
            clientID: clientID,
        });
    } catch (error) {
        return serverError(res, "Error during add plan to client:", error);
    }
};

const getExercises = async (req, res) => {
    try {
        const coachID = req.user_id;

        const exercises = await Exercise.findAll({
            where: {
                [Op.or]: [
                    { coachID: null },       // globalne ćwiczenia
                    { coachID: coachID }     // prywatne tego coacha
                ]
            },
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });

        const result = exercises.map(ex => ({
            id: ex.id,
            name: ex.name,
            description: ex.description,
            picture: ex.picture,
            coachID: ex.coachID,
            categories: ex.Categories?.map(c => ({ id: c.id, name: c.name })) || []
        }));

        res.json(result);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ error: "Nie udało się pobrać ćwiczeń" });
    }
};

const updateExercise = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({ error: 'Access denied' });
    }

    const { id, name, description, categories } = req.body;
    console.log(id, name, description, categories);
    if (!id) {
        return res.status(400).json({ error: "Exercise ID is required" });
    }

    try {
        const exercise = await Exercise.findOne({ where: { id } });

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        // Aktualizacja pól
        exercise.name = name ?? exercise.name;
        exercise.description = description ?? exercise.description;

        if (req.file) {
            exercise.picture = `/uploads/${req.file.filename}`;
        }

        await exercise.save();

        // Aktualizacja kategorii
        if (Array.isArray(categories)) {
            const exerciseId = id;

            // Usuń stare powiązania
            await ExerciseCategory.destroy({ where: { exerciseId } });

            // Dodaj nowe powiązania
            const exerciseCategories = categories.map(catID => ({
                exerciseId,
                categoryId: catID,
            }));

            await ExerciseCategory.bulkCreate(exerciseCategories);
        }

        // Zwracamy zmapowane dane
        const updatedExercise = await Exercise.findOne({
            where: { id },
            include: [{ model: Category, attributes: ['id', 'name'], through: { attributes: [] } }]
        });

        const response = {
            id: updatedExercise.id,
            name: updatedExercise.name,
            description: updatedExercise.description,
            picture: updatedExercise.picture,
            coachID: updatedExercise.coachID,
            categories: updatedExercise.Categories?.map(c => ({ id: c.id, name: c.name })) || []
        };

        return res.json({ success: true, exercise: response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating exercise" });
    }
};

const getTrainerPlans = async (req, res) => {
    if (req.role !== "trainer") {
        return res.status(401).json({ error: 'Access denied' });
    }
    const coachID = req.user_id;
    try {
        const plans = await TrainingPlan.findAll({
            where: { coachID },
            attributes: ['id', 'name', 'coachID', 'createdAt'],
            raw: true
        });

        for (let plan of plans) {
            plan.date = plan.createdAt;
        }

        return res.status(200).json({
            success: true,
            plans
        });
    } catch (error) {
        return serverError(res, "Error fetching trainer plans:", error);
    }
};

module.exports = updateExercise;


module.exports = {
    addExercise,
    getExercise,
    createPlan,
    getPlan,
    updatePlan,
    addPlanToClient,
    getExercises,
    updateExercise,
    getTrainerPlans,
};