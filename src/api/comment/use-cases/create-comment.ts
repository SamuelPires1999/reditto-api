import { Request, Response } from "express";
import { addCommentSchema } from "../schemas";
import { createComment } from "../commentService";
import { ZodError } from "zod";

export const createNewComment = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send("Unauthorized");
    }

    const target = {
        content: req.body.content,
        authorId: req.session.userId,
        postId: req.params.id,
    };

    try {
        const input = addCommentSchema.parse(target);

        const data = await createComment(input);

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
