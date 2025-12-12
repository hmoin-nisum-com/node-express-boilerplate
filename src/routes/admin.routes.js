import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/dashboard", authorize("admin"), (req, res) =>
  res.json({ message: "Admin Dashboard", user: req.user })
);
export default router;
