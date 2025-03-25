const pool = require('../config/db');

const User = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, phone, neighborhood }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, phone, neighborhood) VALUES (?, ?, ?)',
      [name, phone, neighborhood]
    );
    return this.getById(result.insertId);
  },

  async update(id, { name, phone, neighborhood }) {
    await pool.query(
      'UPDATE users SET name = ?, phone = ?, neighborhood = ? WHERE id = ?',
      [name, phone, neighborhood, id]
    );
    return this.getById(id);
  },

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = User;