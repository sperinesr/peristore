const mongoose = require('mongoose');
const { mongoURI } = require('../config/env.config.js');  // Aquí se importa la URL desde el archivo de configuración

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;