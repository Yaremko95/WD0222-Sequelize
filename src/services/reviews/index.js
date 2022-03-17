import { Router } from "express";
import { col, fn } from "sequelize";
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

router.get("/stats", async (req, res, next) => {
  try {
    //get total reviews for each user
    // select "userId", count(r.id), name from reviews as r  join users as u on r."userId"=u.id group by "userId", u.id;

    const totalForEachUser = await Review.findAll({
      include: { model: User, attributes: ["id", "name"] },
      attributes: ["userId", [fn("COUNT", col("review.id")), "totalUsers"]],
      group: ["userId", "user.id"],
    });
    res.send({ totalForEachUser });
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
