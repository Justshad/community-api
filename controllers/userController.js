const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, phone, neighborhood } = req.body;
    
    if (!name || !phone || !neighborhood) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newUser = await User.create({ name, phone, neighborhood });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Phone number already exists' });
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, phone, neighborhood } = req.body;
    const updatedUser = await User.update(req.params.id, { name, phone, neighborhood });
    res.json(updatedUser);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Phone number already exists' });
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};