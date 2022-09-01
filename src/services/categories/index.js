import express from "express";
import Category from "./model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const categories = await Category.bulkCreate([
      { name: "node.js" },
      { name: "backend" },
      { name: "frontend" },
      { name: "react.js" },
      { name: "databases" },
    ]);
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
