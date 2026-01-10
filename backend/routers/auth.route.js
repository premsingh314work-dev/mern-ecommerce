import express from "express";
import { LoginMethod, SignupMethod } from "../controllers/auth.controller.js";

const router= express.Router();

router.post('/signup', SignupMethod);
router.post('/login', LoginMethod);

export default router;