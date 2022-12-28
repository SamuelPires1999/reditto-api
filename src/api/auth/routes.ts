import { Router } from "express";
import { signUpSchema } from "./schemas";
import { ZodError } from "zod";
import { createUser } from "./authService";

const authRoutes = Router();

authRoutes.post("/signUp", async (req, res) => {
  try {
    const input = signUpSchema.parse(req.body);
    // business logic here
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
});

authRoutes.get("/signIn", (req, res) => {
  return res.json({
    message: "SignIn route",
  });
});

export default authRoutes;
