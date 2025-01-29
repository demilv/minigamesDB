const express = require('express');
import {getAllGames, getOneGame, setNewGame, updateGame, deleteGame} from '../controllers/gameController';
const router = express.Router();

router.get("/delGame/:id", deleteGame)

router.get("/", getAllGames)

router.get("/:id", getOneGame)

router.post("/newGame", setNewGame)

router.put("/upGame/:id", updateGame)

export default router;