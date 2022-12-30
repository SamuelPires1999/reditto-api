import { Router } from "express";
import { registerUser, loginUser } from "./use-cases";

const authRoutes = Router();

authRoutes.post("/signUp", registerUser);

authRoutes.post("/signIn", loginUser);

export default authRoutes;
