import jwt from "jsonwebtoken";

// payload: datos que se van a enviar en el token
// secret: clave secreta para firmar el token
// expiresIn: tiempo de expiración del token (hora, dias, semanas, meses, años, etc.)
export const generateJWT = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY_JWT, {
    expiresIn: "1d",
  });
