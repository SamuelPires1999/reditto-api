import jwt from "jsonwebtoken";

export const signToken = async (email: string) => {
  const token = jwt.sign({ email }, "super-secret-jwt");
  console.log(token);
  return token;
};
