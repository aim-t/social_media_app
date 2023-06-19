import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get(
  "/",
  verifyToken,
  getFeedPosts
); /*This will grab the user feed when we are on the homepage. It will take evry single pst in the DB and how it to us. Usually we have algos for that, but to keep it simple, we'll just show all posts */
router.get("/:userId/posts", verifyToken, getUserPosts); /* We want to grab only the relevant user's posts. eg we go to a profile and see their posts only */


//UPDATE
router.patch("/:id/like", verifyToken, likePost); //for liking/unliking the post

export default router;


