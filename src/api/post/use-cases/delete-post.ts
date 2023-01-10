import { Request, Response } from "express";
import { ZodError } from "zod";
import { deletePostSchema } from "../schemas";
import { deletePost as Delete, findSinglePost } from "../postService";

export const deletePost = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const input = deletePostSchema.parse(req.params.id);
        const targetPost = await findSinglePost(input);

        if (!targetPost) {
            return res.send(404).send("Post not found");
        }

        if (targetPost.authorId !== req.session.userId) {
            return res.status(401).send("Unauthorized");
        }

        const data = await Delete(input);
        return res.json({
            data,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.json({
                message: "input parsing error",
                error,
            });
        }

        res.status(500).send("unknown server error");
    }
};
