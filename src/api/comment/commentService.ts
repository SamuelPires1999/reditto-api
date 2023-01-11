import { db } from "../../infra/database";
import { z } from "zod";
import { addCommentSchema } from "./schemas";

export const createComment = async (input: z.infer<typeof addCommentSchema>) => {
    const newComment = await db.comment.create({
        data: input,
    });

    return newComment;
};
