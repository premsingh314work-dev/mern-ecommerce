import express from "express";
import { LoginMethod, SignupMethod } from "../controllers/auth.controller.js";

const Authrouter= express.Router();

Authrouter.post('/signup', SignupMethod);
Authrouter.post('/login', LoginMethod);

export default Authrouter;