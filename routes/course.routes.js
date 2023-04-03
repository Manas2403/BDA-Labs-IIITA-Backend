import { Router } from "express";
const router = Router();
import { getAllCourses } from "../controllers/course.controller.js";
router.get("/", getAllCourses);
export default router;
