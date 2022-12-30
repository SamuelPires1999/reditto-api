import { Router } from "express";
import { signUpSchema, signInSchema } from "./schemas";
import { ZodError } from "zod";
import { createUser, loginUser } from "./authService";
import { registerUser } from "./use-cases";

const authRoutes = Router();

authRoutes.post("/signUp", registerUser);

authRoutes.post("/signIn", async (req, res) => {
    try {
        const input = signInSchema.parse(req.body);
        const data = await loginUser(input);
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
});

export default authRoutes;
