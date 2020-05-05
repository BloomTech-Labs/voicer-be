const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');
const Users = require('../models/userModel.js');


const minutes = value => {
    return value * 60 * 1000;
}

const createToken = async (id) => {
    return Users.findById(id)
        .then(user => {
            const payload = {
                user_id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                display_name: user.display_name
            }

            const options = {
                expiresIn: minutes(60)
            }

            const token = jwt.sign(payload, secret.jwtSecret, options);

            return token;
        })
        .catch(err => res.status(500).JSON({message: `An error occured signing in: ${err}`}))
}

module.exports = {
    minutes,
    createToken
}