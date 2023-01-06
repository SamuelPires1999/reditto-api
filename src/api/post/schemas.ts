import { z } from "zod";

export const getPostsSchema = z.object({
    skip: z.string().optional(),
    take: z.string().optional(),
});

export const createPostSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string().uuid(),
});
