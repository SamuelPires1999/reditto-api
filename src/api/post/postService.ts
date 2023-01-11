import { z } from "zod";
import { createPostSchema, deletePostSchema, getPostsSchema } from "./schemas";
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

export const deletePost = async (input: z.infer<typeof deletePostSchema>) => {
    const deletedPost = await db.post.delete({
        where: {
            id: input,
        },
    });

    return deletedPost;
};

//TODO - change this, using the delete schema because its basically the same, but it should change this in the future
export const findSinglePost = async (input: z.infer<typeof deletePostSchema>) => {
    const post = await db.post.findUnique({ where: { id: input } });

    return post;
};
