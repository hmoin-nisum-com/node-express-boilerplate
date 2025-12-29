import User from "../../models/user.model.js";
import RefreshToken from "../../models/refreshToken.model.js";

export const findUserByEmail = (email) =>
  User.findOne({ email });

export const createUser = (data) =>
  User.create(data);

export const createRefreshToken = (data) =>
  RefreshToken.create(data);

export const findRefreshToken = (tokenHash) =>
  RefreshToken.findOne({ tokenHash }).populate("user");

export const revokeRefreshToken = async (token, updates) => {
  Object.assign(token, updates);
  await token.save();
};
