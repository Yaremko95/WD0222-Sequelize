import Blog from "./model.js";
import User from "../users/modal.js";

import express from "express";
import BlogCategory from "./blogCategoriesModel.js";
import Category from "../categories/model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        User,
        {
          model: Category,
          attributes: ["name", "id"],
          through: { attributes: [] },
        },
      ], //Blog.belongsTo(User);
    });

    res.send(blogs);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    res.send(blog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });

    if (newBlog.id) {
      const dataToInsert = req.body.categories.map((categoryId) => ({
        categoryId: categoryId,
        blogId: newBlog.id,
      }));

      await BlogCategory.bulkCreate(dataToInsert);
    }

    res.send(newBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ rows: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:blogId/add/:categoryId", async (req, res, next) => {
  try {
    const result = await BlogCategory.create({
      categoryId: req.params.categoryId,
      blogId: req.params.blogId,
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:blogId/delete/:categoryId", async (req, res, next) => {
  try {
    const result = await BlogCategory.destroy({
      where: {
        categoryId: req.params.categoryId,
        blogId: req.params.blogId,
      },
    });
    res.send({ rows: result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
