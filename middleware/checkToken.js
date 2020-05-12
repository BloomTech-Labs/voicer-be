const jwt = require('jsonwebtoken');
const { minutes, createToken } = require('../common/functions');

module.exports = (req, res, next) => {
    const token = req.headers.Authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, dJwt) => {
            if(err) {
                res.status(401).json({ error: err });
            } else {
                if (dJwt.expiresIn < minutes(20)) {
                    req.dJwt = dJwt;
                    res.token = createToken(dJwt.user_id);
                }
            }
        });
    }
    next();
}