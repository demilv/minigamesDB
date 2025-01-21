const express = require('express');
import {getAllScores, getOneScore, setNewScore, updateScore, deleteScore} from '../controllers/scoreController';
const router = express.Router();

router.get("/delScore/:id", deleteScore)

router.get("/", getAllScores)

router.get("/:id", getOneScore)

router.post("/newScore", setNewScore)

router.put("/upScore/:id", updateScore)

export default router;