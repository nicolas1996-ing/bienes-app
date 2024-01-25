// export por default no necesita el uso de { }, pero si necesita el uso de la extención del archivo (.js)
import { check, validationResult } from "express-validator";
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
    // validaciones
    await check("firstName", "name is required").not().isEmpty().run(req);
    await check("lastName", "last name is required").not().isEmpty().run(req);
    await check("email", "email is required").isEmail().run(req);
    await check("phone")
      .notEmpty()
      .withMessage("phone is required !!!")
      .run(req);
    await check("password", "password is required")
      .isLength({ min: 6 })
      .not()
      .isEmpty()
      .run(req);
    await check("passwordConfirm")
      .equals(req.body.password)
      .withMessage("password are not the same")
      .run(req);
    let validationsErrorsForm = validationResult(req);

    if (!validationsErrorsForm.isEmpty()) {
      // renderizar vista y enviar parametros
      // array(): convierte el string en un array de objetos
      return res.render("auth/register", {
        success: false,
        view: "create an account",
        errors: validationsErrorsForm.array(),
        user: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
        },
      });
    }

    // validar email
    const userExistInBd = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExistInBd) {
      return res.render("auth/register", {
        success: false,
        view: "create an account",
        errors: [{ msg: "email is already in database" }],
        user: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
        },
      });
    }

    // save user in the db
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "registerFormController",
      body: req.body,
      newUser,
      validationsErrorsForm,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "registerFormController",
      body: req.body,
      error,
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
