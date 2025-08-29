const express = require('express');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');
const { getLogs, addLogs, getPlan, getClientPlans} = require("../server/exercise_service/plan");


router.get("/all", verifyToken, getClientPlans);
router.get("/:plan_id/", verifyToken, getLogs);
router.post("/:plan_id/:client_id", verifyToken, addLogs);
router.get("/", verifyToken, getPlan);

module.exports = router;