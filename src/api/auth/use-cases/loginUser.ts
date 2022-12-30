import { Request, Response } from "express";
import { signInSchema } from "../schemas";
import { loginUser as signIn } from "../authService";
import { ZodError } from "zod";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const input = signInSchema.parse(req.body);
        const data = await signIn(input);
        if (data.error) {
            return res.status(401).json({
                error: data.error,
            });
        }
        return res.json({
            user: data.user,
            token: data.token,
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
