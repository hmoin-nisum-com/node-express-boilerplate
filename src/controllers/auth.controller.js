import * as authService from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const data = await authService.signup(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body, req.ip);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const data = await authService.refreshToken(req.body.refreshToken, req.ip);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const revoke = async (req, res, next) => {
  try {
    await authService.revokeToken(req.body.refreshToken, req.ip);
    res.json({ message: "Token revoked" });
  } catch (err) {
    next(err);
  }
};
