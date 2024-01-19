import express from "express";
import {
  login,
  loginForm,
  recoveryPassword,
  registerForm,
} from "../controllers/auth.controller.js";

const router = express.Router();

// endpoints
router.get("/", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/" });
});

router.get("/about-us", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/about-us" });
});

router.post("/login", [], login);

// vistas de autenticacion
router.get("/login", loginForm);
router.get("/register", registerForm);
router.get("/recovery-password", recoveryPassword)

export default router;
