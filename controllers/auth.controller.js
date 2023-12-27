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
