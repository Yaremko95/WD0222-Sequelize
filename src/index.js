import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import usersRouter from "./services/users/index.js";
import blogsRouter from "./services/blogs/index.js";
import categoriesRouter from "./services/categories/index.js";
import User from "./services/users/modal.js";
import Blog from "./services/blogs/model.js";
import BlogCategory from "./services/blogs/blogCategoriesModel.js";
import Category from "./services/categories/model.js";

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(Category, { through: BlogCategory });
Category.belongsToMany(Blog, { through: BlogCategory });

const server = express();

server.use(express.json());

server.use(cors());
server.use("/users", usersRouter);
server.use("/blogs", blogsRouter);
server.use("/categories", categoriesRouter);

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
