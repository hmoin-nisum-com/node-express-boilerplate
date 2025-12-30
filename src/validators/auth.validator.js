const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

const normalizeString = (v) => (typeof v === "string" ? v.trim() : "");

// Simple email check (good enough for API validation; not RFC-perfect).
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const err = (path, message) => ({ path, message });

export const validateSignup = (body) => {
  const details = [];
  if (!isPlainObject(body)) {
    return { value: {}, error: [err("", "Body must be a JSON object")] };
  }

  const email = normalizeString(body.email);
  const password = normalizeString(body.password);

  if (!email) details.push(err("email", "Email is required"));
  else if (!isEmail(email)) details.push(err("email", "Email must be valid"));

  if (!password) details.push(err("password", "Password is required"));
  else if (password.length < 6)
    details.push(err("password", "Password must be at least 6 characters"));

  if (details.length) return { value: {}, error: details };
  return { value: { email, password }, error: null };
};

export const validateLogin = (body) => {
  const details = [];
  if (!isPlainObject(body)) {
    return { value: {}, error: [err("", "Body must be a JSON object")] };
  }

  const email = normalizeString(body.email);
  const password = normalizeString(body.password);

  if (!email) details.push(err("email", "Email is required"));
  else if (!isEmail(email)) details.push(err("email", "Email must be valid"));

  if (!password) details.push(err("password", "Password is required"));

  if (details.length) return { value: {}, error: details };
  return { value: { email, password }, error: null };
};

export const validateRefreshToken = (body) => {
  const details = [];
  if (!isPlainObject(body)) {
    return { value: {}, error: [err("", "Body must be a JSON object")] };
  }

  const refreshToken = normalizeString(body.refreshToken);
  if (!refreshToken) details.push(err("refreshToken", "Refresh token is required"));
  else if (refreshToken.length < 10)
    details.push(err("refreshToken", "Refresh token is too short"));

  if (details.length) return { value: {}, error: details };
  return { value: { refreshToken }, error: null };
};

export const validateRevokeToken = validateRefreshToken;