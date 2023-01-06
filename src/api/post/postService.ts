import { z } from "zod";
import { createPostSchema, getPostsSchema } from "./schemas";
import { db } from "../../infra/database";

export const getPosts = async (input: z.infer<typeof getPostsSchema>) => {
    //TODO - find a good way to fix the possible skip and take being undefined for int parsing
    const posts = await db.post.findMany({
        skip: parseInt(input.skip || "0"),
        take: parseInt(input.take || "20"),
    });

    return posts;
};

export const createPost = async (input: z.infer<typeof createPostSchema>) => {
    const newPost = await db.post.create({
        data: {
            content: input.content,
            title: input.title,
            authorId: input.authorId,
        },
    });

    return newPost;
};
