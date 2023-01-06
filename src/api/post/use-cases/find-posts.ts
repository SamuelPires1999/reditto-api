import { Request, Response } from "express";
import { ZodError } from "zod";
import { getPostsSchema } from "../schemas";
import { getPosts } from "../postService";

export const findPosts = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const input = getPostsSchema.parse(req.query);

        const data = await getPosts(input);

        return res.json({
            data,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.json({
                message: "Input parsing error",
                error,
            });
        }

        return res.status(500).send("Unknown server error");
    }
};
