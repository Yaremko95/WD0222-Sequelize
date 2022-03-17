import { Router } from "express";
import { Review, Article, User } from "../../db/models/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [User, { model: Article, include: User }],
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(updated);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedRecords = await Review.destroy({
      where: { id: req.params.id },
    });
    res.send({ rows: deletedRecords });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
