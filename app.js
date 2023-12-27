// require("dotenv").config(); // import dotenv

// import/export modules
import "dotenv/config";
import { static as st } from "express";
import express, { json } from "express";
import authRouter from "./routes/auth.route.js";
import { paths } from "./constants/endpoints.path.js";
import cors from "cors";

const app = express(); // create express app

// midellewares
app.use(st("public")); // static files localhost:3000/
app.use(express.json()); // for parsing application/json
app.use(cors()); // for cors

// routes
app.use(paths.auth.path, authRouter);

// init server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
