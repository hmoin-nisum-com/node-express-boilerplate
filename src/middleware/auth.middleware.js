import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (typeof roles === "string") roles = [roles];
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    });
  };
