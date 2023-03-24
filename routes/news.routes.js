import { Router } from "express";
const router = Router();
import { getAllNews } from "../controllers/news.controller";
router.get("/news", getAllNews);
export default router;
