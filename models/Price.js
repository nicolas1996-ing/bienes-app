import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Price = db.define("price", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Price;
