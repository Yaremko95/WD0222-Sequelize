import express from "express";
import pool from "./utils/db.js";
import cors from "cors";
import productsRouter from "./services/product.js";

const server = express();

server.use(express.json());

server.use(cors());

server.use("/products", productsRouter);

const { PORT = 5001 } = process.env;

const initalize = async () => {
  try {
    await pool.query("select 1+1;");
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

initalize();
