import { z } from "zod";
import { signUpSchema } from "./schemas";
import { db } from "../../infra/database";
import bcrypt from "bcrypt";

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
