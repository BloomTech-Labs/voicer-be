const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const checkRole = require('../middleware/checkRole.js');

const voiceSample = require('../models/voiceSamplesModel.js');
const Users = require('../models/userModel.js');

// Find all users
router.get('/', (req, res) => {
    Users.findBasic(req.query)
        .then(users => {
            console.log(users)
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                error: err
            });
        });
});

// List all inactive users. Must be an admin
router.get('/inactive', /* checkAdmin() */ (req, res) => {
    Users.findInactiveUsers()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({message: `An internal server error occured fetching inactive users: ${err}`}))
})

// Find user by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Users.findBasic({id: id})
        .then(user => {
            user.samples = voiceSample.find(id);
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})

// Update user
router.put('/:id', /*checkAccountOwner() ,*/ (req, res) => {
    const id = req.params.id;
    const user = req.body;
    Users.findById(id)
        .then(
            Users.updateUser(id, user)
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(err => {
                    res.status(400).json({
                        message: `Could not update user with ID: ${id}`,
                        error: err.message
                    })
                })
        )
        .catch(err => {
            res.status(500).json({
                message: `Could not find user with ID: ${id}`,
                error: err.message
            })
        })
})

// Deactivate user
router.get('/:id/deactivate', /*checkAccountOwner() ,*/ (req, res) => {
    const id = req.params.id;
    Users.findBasic({id: id})
        .then(user => {
            console.log(user)
            if(!user.active) {
                res.status(400).json({message: 'User already deactivated'})
            } else {
                Users.deactivateUser(user.id)
                    .then(user => res.status(200).json({message: 'User successfully deactivated'}))
                    .catch(err => res.status(200).json({message: `A server error occured deactivating user: ${err}`}))
            }
        })
        .catch(err => res.status(500).json({message: `An internal server 
                                                error occured: ${err}`}))
})

// Reactivate user
router.get('/:id/reactivate', (req, res) => {
    const id = req.params.id;
        Users.reactivateUser(id)
            .then(user => res.status(200).json({message: 'User successfully reactivated!'}))
            .catch(err => res.status(200).json({message: `A server error occured reactivating user: ${err}`}))
})

module.exports = router;