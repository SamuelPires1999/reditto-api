import { Router } from "express";
import { findPosts, newPost } from "./use-cases";

const postRoutes = Router();

postRoutes.get("/get-all", findPosts);
postRoutes.post("/new-post", newPost);

export default postRoutes;
