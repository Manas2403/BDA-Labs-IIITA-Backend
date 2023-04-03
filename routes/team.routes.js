import { Router } from "express";
const router = Router();
import { getTeam } from "../controllers/team.controller.js";
router.get("/", getTeam);
export default router;
