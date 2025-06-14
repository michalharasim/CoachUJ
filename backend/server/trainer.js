const { Sequelize } = require("sequelize");

async function getExercise(req, res, Exercise) {
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
                path: exercise.path,
                coachID: exercise.coachID,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Exercise with that id doesnt exist",
            });
        }
    } catch (error) {
        console.error("Error on get exercise:", error);
        return res.status(500).json({
            success: false,
            error: "server error",
        });
    }
}

async function addExercise(req, res, Exercise) {
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
        console.error("Error during add exercise:", error);
        return res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
}

module.exports = {
    addExercise,
    getExercise,
};