import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Category = db.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
