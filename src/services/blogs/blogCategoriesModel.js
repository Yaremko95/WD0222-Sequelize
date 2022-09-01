import sequelize from "../../db/index.js";
import { DataTypes } from "sequelize";

const BlogCategory = sequelize.define("blogCategory", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
});

export default BlogCategory;
