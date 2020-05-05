const router = require('express').Router();
const bcrypt = require('bcryptjs');
const common = require('../common/functions.js');

const Users = require('../models/userModel.js');

router.post('/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    console.log(user);
    Users.addUser(user)
        .then(async (saved) => {
            
            const token = await common.createToken(saved.id)

            res.status(201).json({token});
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not add user",
                error: err.message
            });
        });
});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    console.log(email, password)

    Users.findByEmail( email )
        .then(async (user) =>  {
            if(user && bcrypt.compareSync(password, user.password)) {
                console.log(user)
                const token = await common.createToken(user.id);
                res.status(200).json({
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect username and/or password"
                });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;