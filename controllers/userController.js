const User = require('../models/userModel');

const userController = {
  getAllUsers: (req, res) => {
    User.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
      res.json(results);
    });
  },
  getUserById: (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(results[0]);
    });
  },
  createUser: (req, res) => {
    const { name, phone, neighborhood } = req.body;
    User.create({ name, phone, neighborhood }, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
      }
      res.status(201).json({ id: results.insertId, name, phone, neighborhood });
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, phone, neighborhood } = req.body;
    User.update(id, { name, phone, neighborhood }, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json({ id, name, phone, neighborhood });
    });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json({ message: 'Utilisateur supprimé avec succès' });
    });
  }
};

module.exports = userController;