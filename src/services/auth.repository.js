import config from "../config/index.js";

let repo;

if (config.db.type === "mongo") {
  repo = await import("./mongo/auth.repository.js");
} else {
  repo = await import("./postgres/auth.repository.js");
}

export default repo;
