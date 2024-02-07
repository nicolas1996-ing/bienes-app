import express from "express";
import {
  confirmRecoveryPassword,
  getUsers,
  loginFormController,
  loginForm,
  recoveryPassword,
  recoveryPasswordController,
  registerConfirm,
  registerFormController,
  registerFormView,
  stepsRecoveryPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// endpoints
router.get("/", getUsers);

router.get("/about-us", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/about-us" });
});

// ===================================================
// =================login de usuario =================
// vistas de autenticacion
router.get("/login", loginForm);
router.post("/login", [], loginFormController);

// ===================================================
// =================crear un usuario =================
router.get("/register", registerFormView); // vista de registro
router.post("/register", [], registerFormController); // logica de registro
router.get("/confirm-register/:token", registerConfirm); // confirmar registro 

// ===================================================
// recuperar contraseña
// generar token de recuperación vista + formulario(controlador) envio de email 
router.get("/recovery-password", recoveryPassword); // vista 
router.post("/recovery-password", recoveryPasswordController); // controlador

// vista de recuperación de contraseña donde recibe token formulario de recuperación + controlador
router.get("/steps-recovery-password/:token", stepsRecoveryPassword) // vista - cuando el usuario ingrese a la url enviada por email - renderiza el formulario de recuperación 
router.post("/confirm-recovery-password",confirmRecoveryPassword) // controlador - recibe los datos del formulario de recuperación de contraseña (vista anterior)

export default router;
