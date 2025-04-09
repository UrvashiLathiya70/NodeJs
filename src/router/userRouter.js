const express = require('express');
const router = new express.Router();
const Middleware = require('../middleware/verifytoken');

const userController = require('../controller/user.controller');


router.post('/registration', Controller.userController.userRegistration);
router.patch('/verifyotp', Controller.userController.verfiyOtp);
router.post('/login', Controller.userController.signin);


module.exports = router;
