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

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // according to our model schema we have set the default behaviour of not sending user password, but here we need password to verify so we need to explicitly select it
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res
            .status(401)
            .json({ message: 'Invalid credentials' })
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return res
            .status(401)
            .json({ message: 'Invalid credentials' })
    }

    const token = user.generateAuthToken();

    return res
        .status(200)
        .json({ token, user })
}


module.exports = {
    registerUser,
    loginUser,
}