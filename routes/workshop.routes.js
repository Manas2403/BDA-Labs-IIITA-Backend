import { Router } from "express";
import { getAllWorkshops } from "../controllers/workshop.controller";
const router = Router();
router.get("/workshops", getAllWorkshops);
export default router;
