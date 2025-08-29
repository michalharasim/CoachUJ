const express = require('express');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');
const { addExercise, getExercise, getExercises, getPlan, createPlan, updatePlan, addPlanToClient, updateExercise, getTrainerPlans } = require('../server/exercise_service/trainer');
const uploadPicture = require('./../uploadMiddleware');

router.get("/exercise/:id", verifyToken, getExercise);
router.post("/exercise", verifyToken, uploadPicture.single('picture'),  addExercise);
router.put("/exercise", verifyToken, uploadPicture.single('picture'),  updateExercise);
router.get("/exercises", verifyToken, getExercises);
router.get("/plan/:id", verifyToken, getPlan);

router.get("/plans", verifyToken, getTrainerPlans);
router.post("/plan", verifyToken, createPlan);
router.put("/plan/:id", verifyToken, updatePlan);
router.post("/plan/:plan_id/:client_id", verifyToken, addPlanToClient);

module.exports = router;