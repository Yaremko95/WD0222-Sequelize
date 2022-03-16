import { Router } from "express";
import { Article, User } from "../../db/models/index.js";
import { Op } from "sequelize";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Article.findAll({
      include: User,
      where: {
        [Op.or]: [
          {
            category: {
              [Op.in]: req.query.category.split(","),
            },
          },
          req.query.title && {
            title: {
              [Op.iLike]: `%${req.query.title}%`,
            },
          },
          req.query.content && {
            content: {
              [Op.iLike]: `%${req.query.content}%`,
            },
          },
        ],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Article.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newArticle = await Article.create(req.body);
    res.send(newArticle);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(result[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Article.destroy({ where: { id: req.params.id } });
    res.send({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default router;
