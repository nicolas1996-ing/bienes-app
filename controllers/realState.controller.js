import { validationResult } from "express-validator";
import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Unit from "../models/Unit.js";

const errorResponse = (req, res, error, controller) => {
  res.status(500).json({
    success: false,
    error,
    controller,
  });
};

const getCatsAndPrices = async () => {
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);
  return [categories, prices];
};

const renderAddProperty = async (req, res, err = [], data = {}) => {
  console.log({ data });
  const [categories, prices] = await getCatsAndPrices();
  res.render("realState/add-property", {
    showNavbar: true,
    prices,
    categories,
    errors: err && err?.array?.length > 0 ? err.array() : [],
    data,
  });
};

export const getUnits = async (req, res) => {
  try {
    const units = await Unit.findAll();
    res.json({ success: true, units, user: req.user });
  } catch (error) {
    console.log(error);
    errorResponse(req, res, error, "getUnits");
  }
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
    await renderAddProperty(req, res);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, error, "addProperty");
  }
};

// controller - post
export const addPropertyController = async (req, res) => {
  try {
    // resultados validación por middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return await renderAddProperty(req, res, errors, req.body);
    }

    // mapper de datos
    const {
      title,
      description,
      priceId,
      categoryId,
      userId,
      roomsNumber,
      parking,
      bathrooms,
      street,
      lat,
      lng,
    } = req.body;

    // extraer el current user
    const currentUser = req.user;

    // creación de la unidad
    const newUnit = await Unit.create({
      title,
      description,
      roomsNumber,
      parking,
      bathrooms,
      street,
      lat,
      lng,
    });

    await newUnit.setPrice(+priceId);
    await newUnit.setCategory(+categoryId);
    await newUnit.setUser(+currentUser?.id);

    // return res.json({ success: true, newUnit, body: req.body, currentUser });
    return res.redirect(`/real-state/add-image/${newUnit.id}`); // endpoint para agregar imagenes
  } catch (error) {
    console.log(error);
    errorResponse(req, res, error, "addProperty controller");
  }
};

// ----------------- start add image -----------------
export const addImageView = async (req, res) => {
  try {
    const { unit_id } = req.params;

    // validación 1. existencia en la bd
    let unit = await Unit.findByPk(unit_id);
    if (!unit) {
      return res.redirect("/real-state/my-admin-panel");
    }
    unit = unit.dataValues;

    // validación 2. propiedad no publicada
    if (!unit.public) {
      return res.redirect("/real-state/my-admin-panel");
    }

    // validación 3. propiedad pertenece al usuario actual
    if (unit.userId.toString() !== req.user.id.toString()) {
      return res.redirect("/real-state/my-admin-panel");
    }

    res.render(`realState/add-image`, { data: { ...unit } });
  } catch (error) {
    console.log(error);
    errorResponse(req, res, error, "addImageView");
  }
};

// ----------------- end add image -----------------
