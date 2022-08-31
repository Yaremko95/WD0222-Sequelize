import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import usersRouter from "./services/users/index.js";

const server = express();

server.use(express.json());

server.use(cors());
server.use("/users", usersRouter);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT);
    });

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

authenticateDB()
  .then(async () => {
    await syncModels();
  })
  .then(() => {
    initalize();
  })
  .catch((e) => console.log(e));
