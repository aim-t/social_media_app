import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Routes for users
const router = express.Router();

// READ routes (No CRUD just READ)
router.get("/:id", verifyToken, getUser); //grab user id dynamically using :id
router.get("/:id/friends", verifyToken, getUserFriends);

// Update 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
