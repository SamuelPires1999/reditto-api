import { Request, Response } from "express";
import { createUser } from "../authService";
import { signUpSchema } from "../schemas";
import { ZodError } from "zod";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const input = signUpSchema.parse(req.body);
        const data = await createUser(input);
        return res.json({
            user: data,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.json({
                message: "Input Parse Error",
                error,
            });
        } else return res.status(500).send("unknown server error");
    }
};
