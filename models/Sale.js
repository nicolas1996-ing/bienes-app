import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Sale = db.define(
  "Sales",
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default Sale;


/*
  logica para la creación de esquemas en la base de datos

  Creación desde node 
    1. si yo creo una tabla aquí con los datos vacios y corro el servidor se crea una tabla en la bd
        solo con los campos id, createdAt, updatedAt
    2. si yo creo una tabla aquí con los datos llenos y corro el servidor se crea una tabla en la bd
            con los campos que yo le pase en la tabla y los campos id, createdAt, updatedAt
  Creación desde la base de datos
    1. si yo creo una tabla en la base de datos y corro el servidor se crea una tabla en la bd
        solo con los campos id, createdAt, updatedAt
    2. si yo creo una tabla en la base de datos y corro el servidor se crea una tabla en la bd
            con los campos que yo le pase en la tabla y los campos id, createdAt, updatedAt
    3. Para que se hablen los dos sistemas ( node y bd ) se debe de crear un modelo en node con los mismos campos que en la bd

   Proceso correcto
    1. crear la tabla en la bd y el modelo en node

   Agregar más campos a la tabla
    1. agregar los campos en la tabla de la bd
    2. agregar los campos en el modelo de node

   Eliminar campos de la tabla
    1. eliminar los campos en la tabla de la bd
    2. eliminar los campos en el modelo de node

   Qué pasa si no agrego los campos en el modelo de node
        cuando haga una consulta de los datos solo me mostrará las columnas que estén en el modelo de node

   *** Es importante tener sincronizados los modelos con la base de datos

*/