import { Router } from "express";
const router = Router();
import { getAllPosts, getPostByTag } from "../controllers/post.controller.js";
router.get("/:tag", getPostByTag);
router.get("/", getAllPosts);
export default router;
