import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "./use-cases";

const authRoutes = Router();

authRoutes.post("/signUp", registerUser);

authRoutes.post("/signIn", loginUser);

authRoutes.post("/signOut", logoutUser);

export default authRoutes;
