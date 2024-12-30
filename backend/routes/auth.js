

const express = require('express')
const router = express.Router()

const {login,register} =require('../controllers/auth')
const {forgotPassword} = require('../controllers/forgot_password')
const {resetPassword} = require('../controllers/reset_password')


router.post('/register',register)
router.post('/login',login)
router.post('/forgotpassword', forgotPassword); // Forgot password route
router.post('/resetpassword/:token', resetPassword); // Reset password route



module.exports = router