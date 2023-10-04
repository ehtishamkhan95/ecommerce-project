import express from "express";

const router = express.Router();

import {createUser, getAllUsers, getSingularUser, updateSingleUser, deleteSingleUser} from "../controller/user.controller.js";

router.post("/user", createUser)
router.get("/user", getAllUsers)
router.get("/user/:id", getSingularUser)
router.put("/user/:id", updateSingleUser)
router.delete("/user/:id", deleteSingleUser)

export {router}
