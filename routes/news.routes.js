import { Router } from "express";
const router = Router();
import { getAllNews } from "../controllers/news.controller.js";
router.get("/", getAllNews);
export default router;
