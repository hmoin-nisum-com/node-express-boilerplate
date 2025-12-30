import User from "../../models/user.model.js";
import RefreshToken from "../../models/refreshToken.model.js";

export const findUserByEmail = (email) =>
  User.findOne({ email });

export const createUser = (data) =>
  User.create(data);

export const createRefreshToken = (data) => {
  // Service layer uses `userId` for DB-agnostic repos; Mongo schema expects `user`.
  const normalized = { ...data };
  if (normalized.userId && !normalized.user) {
    normalized.user = normalized.userId;
    delete normalized.userId;
  }
  return RefreshToken.create(normalized);
};

export const findRefreshToken = (tokenHash) =>
  RefreshToken.findOne({ tokenHash }).populate("user");

export const revokeRefreshToken = async (token, updates) => {
  Object.assign(token, updates);
  await token.save();
};
