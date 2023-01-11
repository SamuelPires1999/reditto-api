import { Router } from "express";
import { createNewComment } from "./use-cases/create-comment";
const commentRoutes = Router();

commentRoutes.put("/new/:id", createNewComment);

export default commentRoutes;
