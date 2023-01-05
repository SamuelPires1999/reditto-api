import { Router } from "express";
import { getProfile } from "./use-cases";

const userRoutes = Router();

userRoutes.get("/profile/:id", getProfile);

export default userRoutes;
