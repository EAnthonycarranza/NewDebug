const express = require('express');
const router = express.Router();
const isAdmin = require('../../utils/isAdmin');
const { authenticate } = require('../../utils/auth');

// Import controllers
const userController = require('../controllers/users');
//const admissionAgreementController = require('../controllers/admissionAgreement');
const personalInformationController = require('../controllers/personalInformation');
const protectedController = require('../controllers/protection');
//const medicalInformationController = require('../controllers/medicalInformation');
//const historyController = require('../controllers/history');
//const educationController = require('../controllers/education');
//const employmentController = require('../controllers/employment');

// Protected route that requires authentication
router.get('/protected-route', authenticate, protectedController.getProtectedData);

// Define the register route
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/adminlogin', userController.adminLogin);

// Admission Agreement routes
//router.get('/admissionAgreement', admissionAgreementController.getAll);
//router.post('/admissionAgreement', admissionAgreementController.create);
//router.get('/admissionAgreement/:id', admissionAgreementController.getOne);
//router.put('/admissionAgreement/:id', admissionAgreementController.update);
//router.delete('/admissionAgreement/:id', admissionAgreementController.delete);

// Personal Information routes
router.post('/personalInformation', authenticate, personalInformationController.create);
router.get('/personalInformation', authenticate, personalInformationController.getAll);
router.get('/personalInformation/:id', authenticate, personalInformationController.getOne);
router.put('/personalInformation/:id', authenticate, isAdmin, personalInformationController.update);
router.delete('/personalInformation/:id', authenticate, isAdmin, personalInformationController.delete);


// Medical Information routes
//router.get('/medicalInformation', medicalInformationController.getAll);
//router.post('/medicalInformation', medicalInformationController.create);
//router.get('/medicalInformation/:id', medicalInformationController.getOne);
//router.put('/medicalInformation/:id', medicalInformationController.update);
//router.delete('/medicalInformation/:id', medicalInformationController.delete);

// History routes
//router.get('/history', historyController.getAll);
//router.post('/history', historyController.create);
//router.get('/history/:id', historyController.getOne);
//router.put('/history/:id', historyController.update);
//router.delete('/history/:id', historyController.delete);

// Education routes
//router.get('/education', educationController.getAll);
//router.post('/education', educationController.create);
//router.get('/education/:id', educationController.getOne);
//router.put('/education/:id', educationController.update);
//router.delete('/education/:id', educationController.delete);

// Employment routes
//router.get('/employment', employmentController.getAll);
//router.post('/employment', employmentController.create);
//router.get('/employment/:id', employmentController.getOne);
//router.put('/employment/:id', employmentController.update);
//router.delete('/employment/:id', employmentController.delete);

module.exports = router;
