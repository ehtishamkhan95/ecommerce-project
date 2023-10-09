import express from "express";
import {createUser, userLogin, getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser} from "../controller/userController.js";

const router = express.Router();

router.post("/user/register", createUser)
router.get("/user", getAllUsers)
router.get("/user/:id", getSingleUser)
router.put("/user/:id", updateSingleUser)
router.delete("/user/:id", deleteSingleUser)

export {router}
