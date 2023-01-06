import { Request, Response } from "express";
import { ZodError } from "zod";
import { createPostSchema } from "../schemas";
import { createPost } from "../postService";

export const newPost = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send("Unauthorized");
    }

    const target = {
        ...req.body,
        authorId: req.session.userId,
    };
    try {
        const input = createPostSchema.parse(target);

        const data = await createPost(input);

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
