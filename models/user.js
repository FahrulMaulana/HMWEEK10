
const pool = require('../config/queris');

const register = async (email, password) => {
  try {
    const result = await pool.query('INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
    if (result.rows.length > 0) {
      return { success: true, user: result.rows[0], message: 'Pendaftaran berhasil' };
    } else {
      return { success: false, message: 'Pendaftaran gagal' };
    }
  } catch (error) {
    throw new Error('Gagal menyimpan pengguna.');
  }
};

const login = async (email, password) => {
  try {
    const result = await pool.query('SELECT * FROM public.users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
      return { success: true, user: result.rows[0], message: 'Login berhasil' };
    }
  } catch (error) {
    throw new Error('Gagal melakukan login.');
  }
};


module.exports = {
  register,
  login
}