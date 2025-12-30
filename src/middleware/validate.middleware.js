/**
 * Reusable request validation middleware.
 * Dependency-free: pass a validator function that returns `{ value, error }`.
 *
 * Usage:
 *   router.post("/signup", validate(validateSignup), controller.signup)
 */
export const validate =
  (validator, { property = "body" } = {}) =>
  (req, res, next) => {
    if (typeof validator !== "function") {
      return next(
        Object.assign(new Error("Invalid validator"), { status: 500 })
      );
    }

    const { value, error } = validator(req[property], req);

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error,
      });
    }

    req[property] = value;
    next();
  };


