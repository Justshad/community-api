const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser la variable d'environnement

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});