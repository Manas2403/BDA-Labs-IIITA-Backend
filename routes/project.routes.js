import { Router } from "express";
const router = Router();
import { getAllProjects } from "../controllers/project.controller.js";
router.get("/", getAllProjects);
export default router;
