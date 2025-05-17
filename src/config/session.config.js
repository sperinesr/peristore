const session = require('express-session');

module.exports = session({
    secret: process.env.SESSION_SECRET || 'unsecretoseguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
});