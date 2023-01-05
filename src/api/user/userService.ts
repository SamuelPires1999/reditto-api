import { z } from "zod";
import { db } from "../../infra/database";
import { getProfileSchema } from "./schemas";

export const getUserProfile = async (id: z.infer<typeof getProfileSchema>) => {
    const userInfo = await db.user.findUnique({
        where: { id: id },
        select: {
            passwordHash: false,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            posts: true,
            replies: true,
            comments: true,
        },
    });

    return userInfo;
};
