import format from "pg-format";
import { pool } from "../database/connection.js";

const verifyEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = %L";
  const formattedQuery = format(query, email);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

const registerUser = async ({ email, password, rol, lenguage }) => {
  const query =
    "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L) RETURNING *";
  const formattedQuery = format(query, email, password, rol, lenguage);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

export const softJobsModel = {
  verifyEmail,
  registerUser,
};
