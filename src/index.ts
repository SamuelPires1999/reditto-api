import dotenv from "dotenv-safe";
import Express, { Response, response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
dotenv.config();

const main = async () => {
  const app = Express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan("combined"));

  app.listen(3000, () => {
    console.log("Application running");
  });
};

main().catch(err => {
  console.log(err);
});
