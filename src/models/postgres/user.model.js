import { pool } from '../../config/postgres.js';

export const createUser = async (name, email) => {
  const { rows } = await pool.query(
    'INSERT INTO users(name, email) VALUES($1,$2) RETURNING *',
    [name, email]
  );
  return rows[0];
};

export const getUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};
