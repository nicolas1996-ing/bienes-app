import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/" });
});

router.get("/about-us", (req, res) => {
  res.json({ success: true, message: "auth-router-work", path: "/about-us" });
});

router.post("/login", [], login);

export default router;
