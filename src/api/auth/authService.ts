import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { db } from "../../infra/database";
import bcrypt from "bcrypt";
import { signToken } from "../../infra/jwt";

export const createUser = async (input: z.infer<typeof signUpSchema>) => {
  console.log("creating user");
  const hashedPassword = await bcrypt.hash(input.password, 5);

  const user = await db.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (input: z.infer<typeof signInSchema>) => {
  const user = await db.user.findFirst({ where: { email: input.email } });
  if (!user) {
    return {
      error: "Invalid Creadentials...",
    };
  }

  const validPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!validPassword) {
    return {
      error: "Invalid Creadentials...",
    };
  }

  const token = await signToken(input.email);

  return {
    user,
    token,
  };
};
