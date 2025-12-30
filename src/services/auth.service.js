import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import repo from "./auth.repository.js";
import config from "../config/index.js";

const randomToken = () =>
  crypto.randomBytes(64).toString("hex");

const hashToken = (t) =>
  crypto.createHash("sha256").update(t).digest("hex");

const accessToken = (user) =>
  jwt.sign(
    { sub: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

export const signup = async ({ email, password }) => {
  if (await repo.findUserByEmail(email))
    throw Object.assign(new Error("Email exists"), { status: 409 });

  const hashed = await bcrypt.hash(
    password,
    config.jwt.saltRounds
  );

  const user = await repo.createUser({ email, password: hashed });

  return {
    user: { id: user.id, email: user.email, role: user.role },
    tokens: await generateTokens(user, "system"),
  };
};

export const login = async ({ email, password }, ip) => {
  const user = await repo.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  return {
    user: { id: user.id, email: user.email, role: user.role },
    tokens: await generateTokens(user, ip),
  };
};

const generateTokens = async (user, ip) => {
  const refresh = randomToken();
  const hash = hashToken(refresh);

  await repo.createRefreshToken({
    userId: user.id,
    tokenHash: hash,
    expires: dayjs().add(config.jwt.refreshDays, "day").toDate(),
    createdByIp: ip,
  });

  return { accessToken: accessToken(user), refreshToken: refresh };
};

export const refreshToken = async (token, ip) => {
  const hash = hashToken(token);
  const existing = await repo.findRefreshToken(hash);

  if (!existing || existing.revoked || existing.expires < new Date())
    throw Object.assign(new Error("Invalid refresh token"), { status: 401 });

  const tokenUser = existing.user
    ? existing.user
    : { id: existing.user_id, role: existing.role };

  const newRefresh = randomToken();
  await repo.revokeRefreshToken(existing, {
    revoked: true,
    revokedByIp: ip,
    replacedByToken: hashToken(newRefresh),
  });

  await repo.createRefreshToken({
    userId: tokenUser.id,
    tokenHash: hashToken(newRefresh),
    expires: dayjs().add(config.jwt.refreshDays, "day").toDate(),
    createdByIp: ip,
  });

  return {
    accessToken: accessToken(tokenUser),
    refreshToken: newRefresh,
  };
};

export const revokeToken = async (token, ip) => {
  const hash = hashToken(token);
  const existing = await repo.findRefreshToken(hash);

  if (!existing || existing.revoked || existing.expires < new Date())
    throw Object.assign(new Error("Invalid refresh token"), { status: 401 });

  await repo.revokeRefreshToken(existing, {
    revoked: true,
    revokedByIp: ip,
    replacedByToken: null,
  });
};
