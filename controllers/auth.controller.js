// renderizar vistas de autenticacion
export const loginForm = async (req, res) => {
  // renderizar vista y pasar datos
  res.render("auth/login", { authenticate: true, view: "login" });
};

export const registerForm = async (req, res) => {
  res.render("auth/register", { success: true, view: "create an account" });
};

export const recoveryPassword = async (req, res) => {
  res.render("auth/recovery-password", { success: true, view: "recovery password" });
}

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
