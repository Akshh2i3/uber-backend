const userModel = require('../models/user.model');

const createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new Error('Missing required fields');
    }


    const user = userModel.create({
        fullName: { firstName, lastName },
        email,
        password
    })

    return user
}


module.exports = {
    createUser
}