import express from "express";
import { addProperty, myAdminPanel } from "../controllers/realState.controller.js";

// ================== endpoints ==================
const router = express.Router();
router.get("/my-admin-panel", myAdminPanel); // vista de mis propiedades 
router.get("/add-property", addProperty); // vista de agregar propiedad

export default router; // exportamos el router