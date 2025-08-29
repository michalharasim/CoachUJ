const { serverError } = require("../helpers");
const ClientWorkoutLog = require('../../models/client_workout_log');
const TrainingPlan = require('../../models/training_plan');
// const User = require('../../models/user');
const ClientTrainingPlan = require('../../models/client_training_plan');

const getLogs = async (req, res) => {
    const planID = parseInt(req.params.plan_id);
    const clientID = req.user_id;
    try {
        const clientWorkoutLogs = await ClientWorkoutLog.findAll({
            where: {
                planID: planID,
                clientID: clientID,
            },
        });
        if (clientWorkoutLogs.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Logs for given plan and client are not found.",
            });
        }

        console.log(`length = ${clientWorkoutLogs.length}`);
        const shortenWorkoutLogs = clientWorkoutLogs.map(obj => {
            const {actualSteps, actualReps, breakTime, notes, actualWeight} = obj;
            return {actualSteps, actualReps, breakTime, notes, actualWeight};
        });

        return res.status(200).json({
            success: true,
            planID: planID,
            clientID: clientID,
            logs: shortenWorkoutLogs,
        });
    } catch (error) {
        return serverError(res, "Error on get logs:", error);
    }
};

const addLogs = async (req, res) => {
    const planID = parseInt(req.params.plan_id);
    const clientID = parseInt(req.params.client_id);
    const body = req.body;
    try {
        const plan = await TrainingPlan.findOne({
            where: {
                id: planID,
            },
        });
        // const client = await User.findOne({
        //     where: {
        //         id: clientID,
        //     },
        // });
        if (plan === null /*|| client === null*/) {
            return res.status(404).json({
                success: false,
                // error: "Plan or client with given id not found",
                error: "Plan with given id not found",
            });
        }

        await ClientWorkoutLog.create({
            planID: planID,
            clientID: clientID,
            actualSteps: body.actualSteps,
            actualReps: body.actualReps,
            breakTime: body.breakTime,
            notes: body.notes,
            actualWeight: body.actualWeight,
        });
        return res.status(201).json({
            success: true,
            planID: planID,
            clientID: clientID,
        });
    } catch (error) {
        return serverError(res, "Error on add logs:", error);
    }
};

const getPlan = async (req, res) => {
    const clientID = req.user_id;
    try {
        const clientPlan = await ClientTrainingPlan.findOne({
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
    if (req.role !== "client") {
        return res.status(401).json({ error: 'Access denied' });
    }
    const clientID = req.user_id;
    try {
        const plans = await ClientTrainingPlan.findAll({
            where: { clientID },
            include: [
                {
                    model: TrainingPlan,
                    as: "plan",
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
    getLogs,
    addLogs,
    getPlan,
    getClientPlans,
}