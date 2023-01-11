import { z } from "zod";

export const addCommentSchema = z.object({
    content: z.string(),
    authorId: z.string().uuid(),
    postId: z.string().uuid(),
});
