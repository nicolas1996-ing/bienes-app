// confirmar cuenta
export const confirmAccount = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, firstName, lastName, token } = data;

  // send email
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirm your account",
    text: "Confirm your account",
    html: `
      <h1>Confirm your account</h1>
      <p>Hi ${firstName} ${lastName}, please confirm your account</p>
      <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Confirm your account</a>
      <p>if you not create this account, please ignore this message </p>
    `,
  });
};

// olvidó contraseña
