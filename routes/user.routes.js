import { Router } from "express";
import {
    registerUser,
    loginUser,
    getUser,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

import passport from "passport";
const router = Router();
router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", passport.authenticate("user"), loginUser);
router.get("/:username", getUser);
export default router;
