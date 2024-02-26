const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Define the register route
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/adminlogin', userController.adminLogin);

module.exports = router;
