const express = require('express');
const { body } = require('express-validator')
const router = express.Router();
const userController = require('../controllers/user.contoller')
const { authUser } = require('../middlewares/auth.middleware')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 chareacters long'),
], userController.registerUser)

router.post('/login',
    [body('email').isEmail().withMessage('Invalid email')],
    userController.loginUser)

router.get('/profile', authUser, userController.getUserProfile);

module.exports = router;