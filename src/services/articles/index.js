import { Router } from "express";
import {
  Article,
  User,
  Review,
  ArticleCategory,
  Category,
} from "../../db/models/index.js";
import { Op } from "sequelize";
import { articles } from "../../data/articles.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: Category, through: { attributes: [] } },
        User,
        { model: Review, include: User },
      ],
    });
    res.send(articles);
  } catch (error) {
    console.log(error);
  }
});

// Select columns using attributes property
// router.get("/", async (req, res, next) => {
//   try {
//     const data = await Article.findAll({
//       include: [

//         { model: User, attributes: ["name", "lastName"] },
//         {
//           model: Review,
//           include: { model: User, attributes: ["id", "name"] },
//           attributes: ["text", "rate"],
//         },
//       ],
//       attributes: ["id", "title"],
//     });
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

//filter with Op operator
router.get("/filters", async (req, res, next) => {
  try {
    const data = await Article.findAll({
      include: User,
      where: {
        [Op.or]: [
          req.query.category && {
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
    const data = await Article.findByPk(req.params.id, { include: User });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { categoryId, ...rest } = req.body;
    console.log("rest", rest);

    const newArticle = await Article.create(rest);

    const articleCategory = await ArticleCategory.create({
      articleId: newArticle.id,
      categoryId: categoryId,
    });

    res.send({ newArticle, articleCategory });
  } catch (error) {
    console.log(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const newUser = await Article.bulkCreate(articles);
    res.send(newUser);
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
