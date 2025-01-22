const express = require('express');
import {getAllUsers, getOneUser, setNewUser, updateUser, deleteUser} from '../controllers/userController';
const router = express.Router();

router.get("/delUser/:id", deleteUser)

router.get("/", getAllUsers)

router.get("/:id", getOneUser)

router.post("/newUser", setNewUser)

router.put("/upUser/:id", updateUser)

export default router;