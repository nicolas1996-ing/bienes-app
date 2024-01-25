import express from "express";
import {
  getUsers,
  login,
  loginForm,
  recoveryPassword,
  registerFormController,
  registerFormView,
} from "../controllers/auth.controller.js";

const router = express.Router();

// endpoints
router.get("/", getUsers);

router.get("/about-us", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/about-us" });
});

router.post("/login", [], login);

// vistas de autenticacion
router.get("/login", loginForm);

router.get("/register", registerFormView); // vista de registro
router.post("/register", [], registerFormController); // logica de registro

router.get("/recovery-password", recoveryPassword);

export default router;
