import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Unit = db.define("unit", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
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
    allowNull: false,
  },
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Unit;
/*
    type: DataTypes.STRING(100) -> tipo de dato string con un limite de 100 caracteres
    los modelos se crean en la bd cuando se ejecuta el servidor y hace llamado de éstos
*/
