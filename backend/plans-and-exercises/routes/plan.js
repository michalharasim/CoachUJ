const express = require('express');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');
const { getClientPlanWithLogs, saveWorkoutLog, getPlan, getClientPlans, getTrainerClientPlans, getTrainerClientPlanWithLogs} = require("../server/exercise_service/plan");

router.get("/client/:clientID/plans", verifyToken, getTrainerClientPlans);
router.get("/client/logs/:clientID/:plan_id", verifyToken, getTrainerClientPlanWithLogs);
router.get("/all", verifyToken, getClientPlans);
router.get("/:plan_id", verifyToken, getClientPlanWithLogs);
router.post("/:plan_id", verifyToken, saveWorkoutLog);
router.get("/", verifyToken, getPlan);


module.exports = router;