const express = require('express');
const { body } = require('express-validator')
const router = express.Router();
const userController = require('../controllers/user.contoller')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 chareacters long'),
], userController.registerUser)

router.post('/login',
    [body('email').isEmail().withMessage('Invalid email')],
    userController.loginUser)

module.exports = router;