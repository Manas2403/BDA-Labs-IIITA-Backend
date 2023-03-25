import { Router } from "express";
import { getAllWorkshops } from "../controllers/workshop.controller.js";
const router = Router();
router.get("/", getAllWorkshops);
export default router;
