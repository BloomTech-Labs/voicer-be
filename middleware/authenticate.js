const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token: ", token);
    console.log("req.headers: ", req.headers);
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, dToken) => {
            if (err) {
                res.status(401).json({
                    message: "Unauthorized",
                    error: err.message
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