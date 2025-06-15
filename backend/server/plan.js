const { serverError } = require("./helpers");

async function addLogs(req, res, TrainingPlan, User, ClientWorkoutLog) {
    const planID = req.params.plan_id;
    const clientID = req.params.client_id;
    const body = req.body;
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

        await ClientWorkoutLog.create({
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
}

module.exports = {
    addLogs,
}