import { pool } from "../../config/postgres.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return rows[0];
};

export const createUser = async ({ email, password }) => {
  const { rows } = await pool.query(
    `INSERT INTO users(email,password)
     VALUES($1,$2) RETURNING *`,
    [email, password]
  );
  return rows[0];
};

export const createRefreshToken = async (data) => {
  const { userId, tokenHash, expires, createdByIp } = data;

  await pool.query(
    `INSERT INTO refresh_tokens
     (user_id,token_hash,expires,created_by_ip)
     VALUES($1,$2,$3,$4)`,
    [userId, tokenHash, expires, createdByIp]
  );
};

export const findRefreshToken = async (tokenHash) => {
  const { rows } = await pool.query(
    `SELECT rt.*, u.id as user_id, u.email, u.role
     FROM refresh_tokens rt
     JOIN users u ON u.id=rt.user_id
     WHERE rt.token_hash=$1`,
    [tokenHash]
  );
  return rows[0];
};

export const revokeRefreshToken = async (token, updates) => {
  await pool.query(
    `UPDATE refresh_tokens SET
     revoked=true,
     revoked_by_ip=$1,
     replaced_by_token=$2
     WHERE id=$3`,
    [
      updates.revokedByIp,
      updates.replacedByToken,
      token.id,
    ]
  );
};
