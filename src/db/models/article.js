import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Article = sequelize.define("article", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  //   userId:{

  //   }
});
export default Article;
