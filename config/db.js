const mysql = require('mysql2');
require('dotenv').config(); // Charger les variables d'environnement

const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // Utiliser la variable d'environnement
  user: process.env.DB_USER,       // Utiliser la variable d'environnement
  password: process.env.DB_PASSWORD, // Utiliser la variable d'environnement
  database: process.env.DB_DATABASE // Utiliser la variable d'environnement
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = connection;