require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./index');

app.use(cors());
app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log("Connexion à MongoDB réussie");

    // Démarrer le serveur Express une fois connecté à MongoDB
    app.listen(process.env.PORT, () => {
        console.log(`Serveur lancé sur le port ${process.env.PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error("Erreur de connexion à MongoDB", err);
});

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB déconnecté");
});

