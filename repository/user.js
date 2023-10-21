const pool = require('../config/queris');
const User = require('../models/users');

class UserRepository {
  async getAllUsers() {
    try {
      const { rows } = await pool.query('SELECT * FROM public.users');
      return rows.map(row => new User(row.id, row.email, row.gender, row.password, row.role));
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM public.users WHERE id=$1', [id]);
      if (rows.length === 0) return null;
      const { id: userId, email, gender, password, role } = rows[0];
      return new User(userId, email, gender, password, role);
    } catch (error) {
      throw error;
    }
  }

  async createUser(id, email, gender, password, role) {
    try {
      const query = 'INSERT INTO public.users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [id, email, gender, password, role];
      const { rows } = await pool.query(query, values);
      const { id: userId, email: userEmail, gender: userGender, password: userPassword, role: userRole } = rows[0];
      return new User(userId, userEmail, userGender, userPassword, userRole);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, email, gender, password, role) {
    try {
      const query = 'UPDATE public.users SET email=$1, gender=$2, password=$3, role=$4 WHERE id=$5 RETURNING *';
      const values = [email, gender, password, role, id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) return null;
      const { id: userId, email: userEmail, gender: userGender, password: userPassword, role: userRole } = rows[0];
      return new User(userId, userEmail, userGender, userPassword, userRole);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const query = 'DELETE FROM public.users WHERE id=$1 RETURNING *';
      const values = [id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) return null;
      const { id: userId, email, gender, password, role } = rows[0];
      return new User(userId, email, gender, password, role);
    } catch (error) {
      throw error;
    }
  }

  async getUsersPaginate(page, limit) {
    const startIndex = (page - 1) * limit;
    try {
      const query = `SELECT * FROM public.users LIMIT $1 OFFSET $2`;
      const values = [limit, startIndex];
      const { rows } = await pool.query(query, values);
      return rows.map(row => new User(row.id, row.email, row.gender, row.password, row.role));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();
