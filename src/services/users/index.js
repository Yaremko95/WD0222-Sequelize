import { Router } from "express";
import { User, Article } from "../../db/models/index.js";
import { users } from "../../data/users.js";
import { col, fn } from "sequelize";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await User.findAll({ include: Article });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/stats", async (req, res, next) => {
  try {
    //select total of users where country="Italy"
    const total = await User.count({ where: { country: "Italy" } });

    const oldestInTurkey = await User.max("age", {
      where: { country: "Turkey" },
    });

    //group users by country
    // select country, count(id)  from users group by country;

    const totalByCountry = await User.findAll({
      attributes: ["country", [fn("COUNT", col("id")), "total"]],
      group: "country",
    });

    //get the oldest from each country
    //select country, max(age) from users group by country

    const oldestForEachCountry = await User.findAll({
      attributes: ["country", [fn("MAX", col("age")), "oldestUser"]],
      group: ["country"],
    });

    const youngestForEachCountry = await User.findAll({
      attributes: ["country", [fn("min", col("age")), "oldestUser"]],
      group: ["country"],
    });

    res.send({ oldestInTurkey });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.id, { include: Article });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const newUser = await User.bulkCreate(users);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await User.update(req.body, {
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
    const result = await User.destroy({ where: { id: req.params.id } });
    console.log(result);
    res.send({ result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
