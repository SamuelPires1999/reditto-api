import { Router } from "express";
import { deletePost, findPosts, newPost } from "./use-cases";

const postRoutes = Router();

postRoutes.get("/get-all", findPosts);
postRoutes.post("/new-post", newPost);
postRoutes.delete("/delete-post/:id", deletePost);

export default postRoutes;
