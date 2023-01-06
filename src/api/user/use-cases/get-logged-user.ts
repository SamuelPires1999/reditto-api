import { Request, Response } from "express";
import { db } from "../../../infra/database";

export const getLoggedUser = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }

    const loggedUser = await db.user.findUnique({
        where: {
            id: req.session.userId,
        },
    });

    if (!loggedUser) {
        return res.status(404).json({
            error: "user not found",
        });
    }

    return res.json({
        data: loggedUser,
    });
};
