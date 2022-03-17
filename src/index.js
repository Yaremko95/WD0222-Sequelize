import express from "express";
import * as models from "./db/models/index.js";
import cors from "cors";
import { testDB, syncDB } from "./db/index.js";
import articlesRoute from "./services/articles/index.js";
import usersRoute from "./services/users/index.js";
import reviewsRouter from "./services/reviews/index.js";
const server = express();

server.use(express.json());

server.use(cors());

server.use("/articles", articlesRoute);
server.use("/users", usersRoute);
server.use("/reviews", reviewsRouter);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      await testDB();
      await syncDB();

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

initalize();
