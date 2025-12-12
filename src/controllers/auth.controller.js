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
    const token = req.body.refreshToken;
    if (!token)
      return next(
        Object.assign(new Error("Refresh token required"), { status: 400 })
      );
    const data = await authService.refreshToken(token, req.ip);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const revoke = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    if (!token)
      return next(
        Object.assign(new Error("Refresh token required"), { status: 400 })
      );
    await authService.revokeToken(token, req.ip);
    res.json({ message: "Token revoked" });
  } catch (err) {
    next(err);
  }
};
