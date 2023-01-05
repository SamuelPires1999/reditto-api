import dotenv from "dotenv-safe";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./api/auth/routes";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const main = async () => {
    const app = Express();

    app.use(
        expressSession({
            name: "reditto-auth",
            cookie: {
                maxAge: 7 * 24 * 60 * 60 * 1000, // ms,
            },
            secret: "super-secret-hide-this-later",
            resave: false,
            saveUninitialized: true,
            store: new PrismaSessionStore(new PrismaClient(), {
                checkPeriod: 2 * 60 * 1000, //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }),
        })
    );
    app.use(Express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));

    app.use("/auth", authRoutes);

    app.get("/testing", (req, res) => {
        console.log("User logged: ", req.session.userId);
        return res.send("Testing user logged, check your console");
    });

    app.listen(3000, () => {
        console.log("Application running");
    });
};

main().catch(err => {
    console.log(err);
});
