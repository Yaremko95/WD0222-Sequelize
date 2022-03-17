import { Router } from "express";
import { Category, ArticleCategory, Article } from "../../db/models/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const newRows = await Category.bulkCreate(req.body.data);
    res.send(newRows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
