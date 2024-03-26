import Category from "../models/Category.js";
import Price from "../models/Price.js";

const errorResponse = (req, res, error, controller) => {
  res.status(500).json({
    success: false,
    error,
    controller,
  });
};

export const myAdminPanel = (req, res) => {
  try {
    res.render("realState/my-admin-panel", { showNavbar: true });
  } catch (error) {
    errorResponse(req, res, error, "myRealStateList");
  }
};

// ----------------- add unit -----------------

// view - get
export const addProperty = async (req, res) => {
  try {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);
    res.render("realState/add-property", {
      showNavbar: true,
      prices,
      categories,
    });
  } catch (error) {
    errorResponse(req, res, error, "addProperty");
  }
};

// controller - post
