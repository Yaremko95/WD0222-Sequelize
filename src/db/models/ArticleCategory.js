import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const ArticleCategory = sequelize.define(
  "articleCategory",
  {
    // id: {
    //   primaryKey: true,
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    // },
  },
  {
    timestamps: false,
  }
);

export default ArticleCategory;
