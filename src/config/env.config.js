require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    mongoURI: process.env.MONGODB_URI,
    // secretKey: process.env.SECRET_KEY,
};