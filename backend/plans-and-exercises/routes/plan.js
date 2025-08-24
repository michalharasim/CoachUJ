const express = require('express');
const router = express.Router();
const verifyToken = require('../../Authorization/authMiddleware');
const { getLogs, addLogs, getPlan } = require("../server/exercise_service/plan");


router.get("/:plan_id/:client_id", verifyToken, getLogs);
router.post("/:plan_id/:client_id", verifyToken, addLogs);
router.get("/", verifyToken, getPlan);

module.exports = router;