// require("dotenv").config(); // import dotenv

// import/export modules
import "dotenv/config";
import { static as st } from "express";
import express, { json } from "express";
import authRouter from "./routes/auth.route.js";
import { paths } from "./constants/endpoints.path.js";
import cors from "cors";
import db from "./database/db.js";
// import cookieParser from "cookie-parser";
// import csurf from "csurf";

const app = express(); // create express app

// conexión a la base de datos
(async () => {
  try {
    await db.authenticate();
    db.sync(); // crea las tablas en la db ( si no existen )
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
})();

// midellewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // manejo de formularios
app.use(cors()); // for cors
// app.use(cookieParser()); // for csrf
// app.use(csurf({ cookie: true })); // for csrf

// contenedor de archivos estaticos - carpeta publica
app.use(express.static("public"));

// habilitar pug - vista de nuestra app - npm i pug
app.set("view engine", "pug");
app.set("views", "./views");

// routes
app.use(paths.auth.path, authRouter);

// init server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
