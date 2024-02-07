// export por default no necesita el uso de { }, pero si necesita el uso de la extención del archivo (.js)
import { check, validationResult } from "express-validator";
import User from "../models/Users.js";
import { idGenerator } from "../helpers/token.js";
import { confirmAccount, forgotPassword } from "../helpers/email.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt.js";

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

// ===================================================
// =================login de usuario =================

// renderizar vistas de autenticacion
export const loginForm = async (req, res) => {
  // renderizar vista y pasar datos
  res.render("auth/login", { authenticate: true, view: "login" });
};

// autenticar usuario - logica
export const loginFormController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validaciones
    await check("email", "email is required").isEmail().run(req);
    await check("password", "password is required").not().isEmpty().run(req);
    let validationsErrorsForm = validationResult(req);
    if (!validationsErrorsForm.isEmpty()) {
      return res.render("auth/login", {
        authenticate: true,
        view: "login",
        errors: validationsErrorsForm.array(),
        user: {
          email: req.body.email,
        },
      });
    }

    // search user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("auth/login", {
        authenticate: true,
        view: "login",
        errors: [{ msg: `user with email ${email} is not in database` }],
        user: {
          email: req.body.email,
        },
      });
    }

    if (!user.confirmed) {
      return res.render("auth/login", {
        authenticate: true,
        view: "login",
        errors: [{ msg: `user with email ${email} is not confirmed` }],
        user: {
          email: req.body.email,
        },
      });
    }

    // compare password - metodo en el modelo
    const match = await user.validPassword(password);
    console.log(match);

    if (!match) {
      return errorResponse(req, res);
    }

    // ===================================================
    // autenticación

    // generación de token jwt
    const token = generateJWT(user);
    // almacenar jwt en: cookies, localstorage, session, etc.
    res
      .cookie("_token_bienes_raices", token, {
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: "auth-router-work",
        path: "/login",
        body: req.body,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/login",
      body: req.body,
      error: error,
    });
  }
};

const errorResponse = (req, res, errors, user) =>
  res.render("auth/login", {
    authenticate: true,
    view: "login",
    errors: [{ msg: `password is not valid` }],
    user: {
      email: req.body.email,
    },
  });
// ===================================================
// =================crear un usuario =================

export const registerFormView = async (req, res) => {
  res.render("auth/register", {
    success: true,
    view: "create an account",
    // csrfToken: req.csrfToken(),
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
        errors: [{ msg: `email: ${req.body.email} is already in database` }],
        user: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
        },
      });
    }

    // hash del password en el user.model
    // save user in the db
    const newUser = await User.create({ ...req.body, token: idGenerator() });

    // send confirmation email
    const { password, confirmed, updatedAt, createdAt, ...user } =
      newUser.dataValues;
    confirmAccount(user);

    res.render("templates/message", {
      success: true,
      view: "create an account",
      message:
        "user has been created successfully, check your email to confirm your account",
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

// controlador para confirmar cuenta
export const registerConfirm = async (req, res, next) => {
  try {
    const { token } = req.params; // query params -> req.query.token

    // buscar usuario por token
    const user = await User.findOne({ where: { token } });
    if (user) {
      // confirmar cuenta
      await user.update({ confirmed: true, token: null });
      console.log(user.dataValues);
      res.render("templates/confirm", {
        message: "your account has been confirmed successfully",
        error: false,
      });
    } else {
      res.render("templates/confirm", {
        message: "your account has not been confirmed, token is not valid",
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "we can not confirm your account",
      controller: "auth-controller",
    });
  }
};

// ===================================================
// =================recuperar password================

// vista
export const recoveryPassword = async (req, res) => {
  res.render("auth/recovery-password", {
    success: true,
    view: "recovery password",
  });
};

// controlador
export const recoveryPasswordController = async (req, res) => {
  try {
    // validaciones
    await check("email", "email is required").isEmail().run(req);
    let validationResultForm = validationResult(req);
    if (!validationResultForm.isEmpty()) {
      return res.render("auth/recovery-password", {
        success: false,
        view: "recovery password",
        errors: validationResultForm.array(),
        user: {
          email: req.body.email,
        },
      });
    }

    // buscar usuario por email
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("auth/recovery-password", {
        success: false,
        view: "recovery password",
        errors: [{ msg: `user with email ${email} is not in database` }],
        user: {
          email: req.body.email,
        },
      });
    }

    // generar - almacenar token y enviar email de recuperacion
    const token = idGenerator();
    await user.update({ token });

    console.log(user.dataValues);
    const data = {
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      email: user.dataValues.email,
      token,
    };
    await forgotPassword(data);

    res.render("templates/confirm", {
      view: "recovery password",
      message:
        "the email has been sent successfully, check your email to reset your password",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/change-password",
      body: req.body,
      error,
    });
  }
};

// renderiza el formulario de recuperación
export const stepsRecoveryPassword = async (req, res) => {
  try {
    // verificar token
    const { token } = req.params;
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return res.render("templates/confirm", {
        view: "recovery password",
        message: "recovery password, token is not valid",
        error: true,
      });
    }

    // renderizar formulario para recuperar contraseña
    res.render(`auth/steps-recovery-password`, {
      success: true,
      view: "recovery password",
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/confir-recovery-password",
      body: req.body,
      error,
    });
  }
};

// recibe los datos del formulario de recuperación de contraseña
export const confirmRecoveryPassword = async (req, res, next) => {
  try {
    // await check("firstName", "name is required").not().isEmpty().run(req);
    // let validationsErrorsForm = validationResult(req);
    const { token, new_password, confirm_new_password } = req.body;

    // verificar token
    const user = await User.findOne({ where: { token } });
    if (!user) {
      return res.render("templates/confirm", {
        view: "recovery password",
        message: "recovery password, token is not valid",
        error: true,
      });
    }

    console.log({ token, new_password, confirm_new_password });

    // validar password.
    // check debe de ir con el nombre del campo que se esta validando ( el cual es enviado por el formulario - body.request)
    await check("new_password", "password is required")
      .isLength({ min: 5 })
      .not()
      .isEmpty()
      .run(req);

    await check("new_password")
      .equals(confirm_new_password)
      .withMessage("password are not the same")
      .run(req);

    let validationsErrorsForm = validationResult(req);
    console.log(validationsErrorsForm.array());
    if (!validationsErrorsForm.isEmpty()) {
      return res.render(`auth/steps-recovery-password`, {
        success: false,
        view: "recovery password",
        token,
        errors: validationsErrorsForm.array(),
      });
    }

    // guardar nueva contraseña hash
    const salt = await bcrypt.genSaltSync(10);
    new_password = await bcrypt.hashSync(new_password, salt, null);

    await user.update({ password: new_password, token: null });

    return res.render("templates/confirm", {
      message: "the password has been changed successfully",
      error: false,
      view: "recovery password",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "auth-router-work",
      path: "/confir-recovery-password",
      body: req.body,
      error,
    });
  }
};
