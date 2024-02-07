// confirmar cuenta
// solo usamos mailtrap para desarrollo
// es una plataforma que nos permite simular el envío de correos electrónicos
import nodemailer from "nodemailer";

export const confirmAccount = async (data) => {
  //  configuración envio de emails
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, firstName, lastName, token } = data;

  // send confirmation email
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirm your account",
    text: "Confirm your account",
    html: `
      <h1>Confirm your account</h1>
      <p>Hi ${firstName} ${lastName}, please confirm your account</p>
      <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/auth/confirm-register/${token}">Confirm your account</a>
      <p>if you not create this account, please ignore this message </p>
    `,
  });
};

// olvidó contraseña
export const forgotPassword = async (data) => {
  //  configuración envio de emails
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, firstName, lastName, token } = data;

  // send confirmation email
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    text: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Hi ${firstName} ${lastName}, please reset your password</p>
      <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/auth/steps-recovery-password/${token}">Reset your password</a>
      <p>if you not request this change, please ignore this message </p>
    `,
  });
};
