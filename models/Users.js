import { DataTypes } from "sequelize";
import db from "../database/db.js";
import bcrypt from "bcrypt";

/*
    creación del modelo 
    carperta Users.js
    constante User 
    db.define("users", {...}): nombre de la tabla en la db -> users
*/
const User = db.define(
  "users",
  {
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
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(user.password, salt, null);
      },
    },
    scopes: {
      deletePassword: {
        attributes: {
          exclude: ["password", "token", "confirmed", "createdAt", "updatedAt"],
        },
      },
    },
  }
);

// metodos personalizados asociados al modelo
// this no puede ser usado en arrow function
User.prototype.validPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

export default User;


// scopes sirven paradefinir campos que no se quieren mostrar en una consulta a la db ( pueden haber varios )