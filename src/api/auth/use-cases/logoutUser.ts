import { Request, Response } from "express";

export const logoutUser = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(204).send("No content");
    }

    req.session.destroy(err => {
        console.log(err);
        if (err) {
            res.status(500).send(err);
        }
    });

    return res.status(200).send("Signed Out");
};
