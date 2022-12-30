import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const checkAuthMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies["reditto-auth"];
    const payload = jwt.verify(token, "super-secret-jwt");
    //@ts-ignore
    req.payload = payload;
    next();
};
