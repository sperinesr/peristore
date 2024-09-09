require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_URI,
    // secretKey: process.env.SECRET_KEY,
};