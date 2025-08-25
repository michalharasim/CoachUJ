const express = require('express');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');
const { addExercise, getExercise, getPlan, createPlan, updatePlan, addPlanToClient } = require('../server/exercise_service/trainer');

router.get("/exercise/:id", verifyToken, getExercise);
router.post("/exercise", verifyToken, addExercise);
router.get("/plan/:id", verifyToken, getPlan);
router.post("/plan", verifyToken, createPlan);
router.put("/plan/:id", verifyToken, updatePlan);
router.post("/plan/:plan_id/:client_id", verifyToken, addPlanToClient);

module.exports = router;