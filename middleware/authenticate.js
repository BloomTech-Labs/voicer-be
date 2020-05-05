const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.Authorization;
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, dToken) => {
            if (err) {
                res.status(401).json({
                    message: "Unauthorized"
                });
            } else {
                req.dJwt = dToken;
                next();
            }
        });
    } else {
        res.status(400).json({
            message: "User not logged in"
        });
    };
};