import jwt from "jsonwebtoken";

export const signToken = async (email: string) => {
    const token = jwt.sign({ email }, "super-secret-jwt");
    return token;
};
