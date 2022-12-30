import dotenv from "dotenv-safe";
import Express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./api/auth/routes";
import cookieParser from "cookie-parser";
import { checkAuthMiddlware } from "./middleware";
dotenv.config();

const main = async () => {
    const app = Express();

    app.use(Express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cookieParser());

    app.use("/auth", authRoutes);

    app.get("/testing", checkAuthMiddlware, (req, res) => {
        //@ts-ignore
        console.log(req.payload.email);
        return res.send("testing");
    });

    app.listen(3000, () => {
        console.log("Application running");
    });
};

main().catch(err => {
    console.log(err);
});
