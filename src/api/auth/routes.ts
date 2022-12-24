import { Router } from "express";
import { signUpSchema } from "./schemas";
import { ZodError } from "zod";

const authRoutes = Router();

authRoutes.post("/signUp", (req, res) => {
  try {
    const data = signUpSchema.parse(req.body);
    return res.json({
      data,
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
