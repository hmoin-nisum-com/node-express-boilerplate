import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import config from "../config/index.js";

const randomTokenString = () => crypto.randomBytes(64).toString("hex");
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const signup = async ({ email, password }) => {
  const existing = await User.findOne({ email });
  if (existing)
    throw Object.assign(new Error("Email already registered"), { status: 409 });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  const tokens = await generateTokens(user, "system");
  return { user: { id: user._id, email: user.email, role: user.role }, tokens };
};

export const login = async ({ email, password }, ipAddress = "unknown") => {
  const user = await User.findOne({ email });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });
  const tokens = await generateTokens(user, ipAddress);
  return { user: { id: user._id, email: user.email, role: user.role }, tokens };
};

export const generateAccessToken = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

export const generateTokens = async (user, ipAddress) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = randomTokenString();
  const tokenHash = hashToken(refreshToken);
  const expires = dayjs().add(config.refreshTokenExpiresInDays, "day").toDate();
  await RefreshToken.create({
    user: user._id,
    tokenHash,
    expires,
    createdByIp: ipAddress,
  });
  return { accessToken, refreshToken };
};

export const refreshToken = async (token, ipAddress) => {
  const tokenHash = hashToken(token);
  const existing = await RefreshToken.findOne({ tokenHash }).populate("user");
  if (!existing)
    throw Object.assign(new Error("Invalid refresh token"), { status: 401 });
  if (existing.revoked)
    throw Object.assign(new Error("Refresh token revoked"), { status: 401 });
  if (existing.expires < new Date())
    throw Object.assign(new Error("Refresh token expired"), { status: 401 });
  const user = existing.user;
  const newRefreshToken = randomTokenString();
  const newHash = hashToken(newRefreshToken);
  const expires = dayjs().add(config.refreshTokenExpiresInDays, "day").toDate();
  existing.revoked = true;
  existing.revokedByIp = ipAddress;
  existing.replacedByToken = newHash;
  await existing.save();
  await RefreshToken.create({
    user: user._id,
    tokenHash: newHash,
    expires,
    createdByIp: ipAddress,
  });
  const accessToken = generateAccessToken(user);
  return { accessToken, refreshToken: newRefreshToken };
};

export const revokeToken = async (token, ipAddress) => {
  const tokenHash = hashToken(token);
  const existing = await RefreshToken.findOne({ tokenHash });
  if (!existing)
    throw Object.assign(new Error("Token not found"), { status: 404 });
  existing.revoked = true;
  existing.revokedByIp = ipAddress;
  await existing.save();
};
