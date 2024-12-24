const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({ firstName, lastName, email, password: hashedPassword });

    const token = user.generateAuthToken();

    return res
        .status(201)
        .json({ token, user })
}


module.exports = {
    registerUser
}