import db from "../database/db.js"; // instancia de la conexión a la base de datos
import { Category, Price } from "../models/index.js";
import categories from "./cateogories.js";
import prices from "./prices.js";

const uploadSeedData = async () => {
  try {
    // auth
    await db.authenticate();
    // columns model: sync models with database
    await db.sync();
    // insert
    // se inserta en la bd tantas veces como se corra el script
    await Promise.all([
      Category.bulkCreate(categories),
      Price.bulkCreate(prices),
    ]);
    console.log("Seed data uploaded successfully");
    return;
  } catch (error) {
    console.log({ error });
  }
};

const deleteSeedData = async () => {
  try {
    // auth
    await db.authenticate();
    // columns model: sync models with database
    await db.sync();
    // delete. truncate: reinicializa bd desde el id 1
    await Promise.all([
      Category.destroy({ where: {}, truncate: true }),
      Price.destroy({ where: {}, truncate: true }),
    ]);

    console.log("Seed data deleted successfully");
    return;
  } catch (error) {
    console.log({ error });
  }
};

const dropDatabase = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
  } catch (error) {
    console.log({ error });
  }
};

// console.log("process.argv", process.argv);
if (process.argv[2] === "-upload") uploadSeedData();
if (process.argv[2] === "-delete") deleteSeedData();
if (process.argv[2] === "-drop") dropDatabase();

/*
    ejecutar el script con el siguiente comando: npm run  db:seed:categories

    "db:seed:categories": "node ./seed/seed.js -upload"
    argv[0] = node
    argv[1] = ./seed/seed.js
    argv[2] = -upload
*/
