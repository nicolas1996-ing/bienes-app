// configuración conexión a base de datos

import { Sequelize } from "sequelize";

//  process.env.DB_PASSWORD: ya no es necesario usar el paquete dotenv
// si se quiere cargar el seed es necesario usar el password en reemplazo de process.env.DB_PASSWORD
const db = new Sequelize(
  "bienes-raices",
  "root",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log,
    // agregar estampas de tiempo a cada nuevo registro
    define: {
      timestamps: true,
    },
    // configuracion del pool de conexiones
    // 5 conexiones maximas por usuario
    // idle: tiempo de espera para liberar una conexion
    // acquire: tiempo de espera para obtener una conexion
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    operatorsAliases: false,
  }
);

export default db;
