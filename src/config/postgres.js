import pkg from "pg";
import config from "./index.js";
const { Pool } = pkg;

export const pool = new Pool(config.db.postgres);

const connectPostgres = async () => {
  await pool.query('SELECT 1');
  console.log('✅ PostgreSQL connected');
};

export default connectPostgres;