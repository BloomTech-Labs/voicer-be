const db = require('../data/dbConfig.js');

// Returns all users
const find = (filter) => {
    filter.active = true;
    return db('users')
            .where(filter);
}

// Returns user with the given userId
const findById = (id) => {
    return db('users')
            .where({
                id,
                active: true
            })
            .first();
}

const findByEmail = (email) => {
    console.log(email)
    return db('users')
            .where({
                email,
                active: true
            })
            .first()
}

// Returns an array of all deactivated users
const findInactiveUsers = () => {
    return db('users')
            .where({active: false})
}

// Adds the user to the database and returns the new User
const addUser = async (user) => {
    const [id] = await db('users').insert(user).returning('id');
    return findById(id);
}

// Updates the user with the given userId
const updateUser = async (user) => {
    return await db('users')
                    .where({id: user.id})
                    .update(user);
}

// Archives the user with the given userId
const deactivateUser = async id => {
    let user = await db('users')
                        .where({id})
                        .first();
    console.log(user)
    user = await toggleActive(user);
    return user;
}

// Reactivates user
const reactivateUser = async id => {
    let user = await db('users')
                        .where({id})
                        .first();
    console.log(user)
    user = await toggleActive(user);
    return user;
}

// helper function for dry archival toggling
const toggleActive = async user => {
    console.log(user)
    user.active = !user.active;
    console.log(user)
    user = await updateUser(user);
    return user;
}

module.exports = {
    find,
    findById,
    findByEmail,
    addUser,
    updateUser,
    deactivateUser,
    reactivateUser,
    findInactiveUsers
}