import express from "express";
import models from "./db/models/index.js";
import cors from "cors";
import { testDB, syncDB } from "./db/index.js";

const server = express();

server.use(express.json());

server.use(cors());

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
