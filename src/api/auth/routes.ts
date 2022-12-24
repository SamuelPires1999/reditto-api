import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/signUp", (req, res) => {
  return res.json({
    message: "SignUp route",
  });
});

authRoutes.get("/signIn", (req, res) => {
  return res.json({
    message: "SignIn route",
  });
});

export default authRoutes;
