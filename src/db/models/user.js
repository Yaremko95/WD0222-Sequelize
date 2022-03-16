import sequelize from "../index.js";

import s from "sequelize";

const { DataTypes } = s;

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // type: DataTypes.INTEGER,
      // autoIncrement: true,       autoincrement starting from 1
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
