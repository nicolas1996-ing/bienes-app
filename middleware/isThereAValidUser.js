import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const isThereAValidUser = async (req, res, next) => {
  try {
    // verificar token
    const { _token_bienes_raices } = req?.cookies;

    // validar token
    if (!_token_bienes_raices) {
      return res.redirect("/auth/login");
    }

    // extrer el payload del token
    const {
      id: userId,
      email: userEmail,
      ...others
    } = jwt.verify(_token_bienes_raices, process.env.SECRET_KEY_JWT);

    // scope definido en el modelo sirve para excluir campos al hacer una consulta a la db
    const user = await User.scope("deletePassword").findOne({
      where: { id: userId, email: userEmail },
    });

    if (!user) {
      return res.clearCookie("_token_bienes_raices").redirect("/auth/login");
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.clearCookie("_token_bienes_raices").redirect("/auth/login");
  }
};

export default isThereAValidUser;
