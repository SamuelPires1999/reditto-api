import { Router } from "express";
import { getProfile, getLoggedUser } from "./use-cases";

const userRoutes = Router();

userRoutes.get("/profile/:id", getProfile);
userRoutes.get("/me", getLoggedUser);

export default userRoutes;
