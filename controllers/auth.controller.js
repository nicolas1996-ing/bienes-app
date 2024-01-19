// export por default no necesita el uso de { }, pero si necesita el uso de la extención del archivo (.js)
import User from "../models/Users.js";

// controladores - renderizar vistas de autenticacion
export const loginForm = async (req, res) => {
  // renderizar vista y pasar datos
  res.render("auth/login", { authenticate: true, view: "login" });
};

export const registerFormView = async (req, res) => {
  res.render("auth/register", { success: true, view: "create an account" });
};

export const recoveryPassword = async (req, res) => {
  res.render("auth/recovery-password", {
    success: true,
    view: "recovery password",
  });
};

// controladores - logica
export const registerFormController = async (req, res) => {
  try {
    // save user in the db
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "registerFormController",
      body: req.body,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "registerFormController",
      error: error,
    });
  }
};

// autenticar usuario - logica de negocio
export const login = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: "auth-router-work",
      path: "/login",
      body: req.body,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/login",
      body: req.body,
      error: error,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/login",
      body: req.body,
      error: error,
    });
  }
};
