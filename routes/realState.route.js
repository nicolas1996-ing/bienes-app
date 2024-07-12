import express from "express";
import {
  addImageView,
  addProperty,
  addPropertyController,
  getUnits,
  myAdminPanel,
} from "../controllers/realState.controller.js";
import { check } from "express-validator";
import isThereAValidUser from "../middleware/isThereAValidUser.js";

// ================== endpoints ==================
const router = express.Router();
router.get("/", [isThereAValidUser], getUnits);
router.get("/my-admin-panel", [isThereAValidUser], myAdminPanel); // vista de mis propiedades
router.get("/add-property", [isThereAValidUser], addProperty); // vista de agregar propiedad
router.post(
  "/add-property",
  [
    // validaciones
    isThereAValidUser,
    check("title", "Title is required")
      .notEmpty()
      .isLength({ max: 15 })
      .withMessage("Title must be max 15 characters"),
    check("description", "Description is required").notEmpty(),
    check("priceId", "Price is required").notEmpty(),
    check("priceId", "Price must be greater than 0").isFloat({ gt: 0 }),
    check("categoryId", "Category is required")
      .notEmpty()
      .isNumeric()
      .withMessage("Select a category"),
    check("priceId", "Price is required").notEmpty(),
    check("roomsNumber")
      .notEmpty()
      .isNumeric()
      .withMessage("Select a number of rooms"),
    check("parking")
      .notEmpty()
      .isNumeric()
      .withMessage("Select a number of parking"),
    check("bathrooms")
      .notEmpty()
      .isNumeric()
      .withMessage("Select a number of bathrooms"),
    check("lat").notEmpty().isNumeric().withMessage("Select a latitude"),
    check("lng").notEmpty().isNumeric().withMessage("Select a longitude"),
  ],
  addPropertyController
); // controlador de agregar propiedad
// =====================================
router.get("/add-image/:unit_id", [isThereAValidUser], addImageView);
// =====================================

export default router; // exportamos el router
