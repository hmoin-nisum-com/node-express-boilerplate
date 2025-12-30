import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  validateSignup,
  validateLogin,
  validateRefreshToken,
  validateRevokeToken,
} from "../validators/auth.validator.js";
const router = express.Router();
router.post("/signup", validate(validateSignup), authController.signup);
router.post("/login", validate(validateLogin), authController.login);
router.post("/refresh-token", validate(validateRefreshToken), authController.refresh);
router.post("/revoke-token", validate(validateRevokeToken), authController.revoke);
export default router;
