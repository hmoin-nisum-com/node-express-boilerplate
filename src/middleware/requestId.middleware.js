import crypto from "crypto";

const HEADER = "x-request-id";

const isReasonableId = (value) =>
  typeof value === "string" && value.length >= 8 && value.length <= 128;

/**
 * Reusable correlation-id middleware.
 * - Accepts inbound X-Request-Id if present (and reasonable)
 * - Otherwise generates a UUID
 * - Exposes `req.requestId` and sets response header `X-Request-Id`
 */
export const requestId = () => (req, res, next) => {
  const incoming = req.headers[HEADER];
  const id = isReasonableId(incoming) ? incoming : crypto.randomUUID();

  req.requestId = id;
  res.setHeader("X-Request-Id", id);
  res.locals.requestId = id;

  next();
};


