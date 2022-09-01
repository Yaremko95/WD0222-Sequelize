import sequelize from "../../db/index.js";
import { DataTypes } from "sequelize";

const Blog = sequelize.define("blogs", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

export default Blog;
