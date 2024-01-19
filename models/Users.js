import { DataTypes } from "sequelize";
import db from "../database/db.js";

/*
    creación del modelo 
    carperta Users.js
    constante User 
    db.define("users", {...}): nombre de la tabla en la db -> users
*/
const User = db.define("users", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;