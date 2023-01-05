import { Request, Response } from "express";
import { ZodError } from "zod";
import { getProfileSchema } from "../schemas";
import { getUserProfile } from "../userService";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const input = getProfileSchema.parse(req.params.id);
        const data = await getUserProfile(input);

        return res.json({
            data,
        });
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(401).json({
                err,
            });
        }
    }
};
