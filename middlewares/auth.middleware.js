const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Unauthorized 1' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user;

        return next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Unauthorized 2' })
    }
}

module.exports = { authUser };