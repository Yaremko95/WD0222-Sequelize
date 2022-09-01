import express, { query } from "express";
import User from "./modal.js";
import Blog from "../blogs/model.js";
import sequelize from "../../db/index.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.firstName) {
      query.firstName = {
        [Op.iLike]: `%${req.query.firstName}%`,
      };
    }
    if (req.query.age) {
      query.age = {
        [Op.between]: req.query.age.split(","),
      };
    }
    if (req.query.country) {
      query.country = {
        [Op.in]: req.query.country.split(","),
      };
    }
    const users = await User.findAll({
      //attributes: ["firstName", "lastName", "age", "country"],
      //   attributes: {
      //     exclude: ["country", "age"],
      //   },
      include: Blog, // User.hasMany(Blog);

      where: query,
    });

    // const result = await sequelize.query(
    //   'select id, "firstName", "lastName", "createdAt", "updatedAt" from "users"'
    // );
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // const user = await User.findAll({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const users = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const users = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
