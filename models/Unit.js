import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Price from "./Price.js";
import Category from "./Category.js";
import { Users } from "./index.js";

const Unit = db.define("unit", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  roomsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parking: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

// Define las asociaciones después de la definición de los atributos
Unit.belongsTo(Price); // Asociación con Price
Unit.belongsTo(Category); // Asociación con Category
Unit.belongsTo(Users); // Asociación con Users

export default Unit;
/*
    type: DataTypes.STRING(100) -> tipo de dato string con un limite de 100 caracteres
    los modelos se crean en la bd cuando se ejecuta el servidor y hace llamado de éstos
*/
