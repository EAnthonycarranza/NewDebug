const express = require('express');
const router = express.Router();
const isAdmin = require('../../utils/isAdmin');
const { authenticate } = require('../../utils/auth');

// Import controllers
const userController = require('../controllers/users');
const admissionAgreementController = require('../controllers/admissionAgreement');
const personalInformationController = require('../controllers/personalInformation');
const protectedController = require('../controllers/protection');
const medicalInformationController = require('../controllers/medicalInformation');
const historyController = require('../controllers/history');
const educationController = require('../controllers/education');
const employmentController = require('../controllers/employment');

// Protected route that requires authentication
router.get('/protected-route', authenticate, protectedController.getProtectedData);

// Define the register route
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/adminlogin', userController.adminLogin);

// Admission Agreement routes
router.get('/admissionAgreement', authenticate, admissionAgreementController.getAll);
router.post('/admissionAgreement', authenticate, admissionAgreementController.create);
router.get('/admissionAgreement/:id', authenticate, admissionAgreementController.getOne);
router.put('/admissionAgreement/:id', isAdmin, admissionAgreementController.update);
router.delete('/admissionAgreement/:id', isAdmin, admissionAgreementController.delete);

// Personal Information routes
router.post('/personalInformation', authenticate, personalInformationController.create);
router.get('/personalInformation', authenticate, personalInformationController.getAll);
router.get('/personalInformation/:id', authenticate, personalInformationController.getOne);
router.put('/personalInformation/:id', isAdmin, personalInformationController.update);
router.delete('/personalInformation/:id',isAdmin, personalInformationController.delete);

// Medical Information routes
router.get('/medicalInformation', authenticate, medicalInformationController.getAll);
router.post('/medicalInformation', authenticate, medicalInformationController.create);
router.get('/medicalInformation/:id', authenticate, medicalInformationController.getOne);
router.put('/medicalInformation/:id', isAdmin, medicalInformationController.update);
router.delete('/medicalInformation/:id', isAdmin, medicalInformationController.delete);

// History routes
router.get('/history', authenticate, historyController.getAll);
router.post('/history', authenticate, historyController.create);
router.get('/history/:id', authenticate, historyController.getOne);
router.put('/history/:id', isAdmin, historyController.update);
router.delete('/history/:id', isAdmin, historyController.delete);

// Education routes
router.get('/education', authenticate, educationController.getAll);
router.post('/education', authenticate, educationController.create);
router.get('/education/:id', authenticate, educationController.getOne);
router.put('/education/:id', isAdmin, educationController.update);
router.delete('/education/:id', isAdmin, educationController.delete);

// Employment routes
router.get('/employment', authenticate, employmentController.getAll);
router.post('/employment', authenticate, employmentController.create);
router.get('/employment/:id', authenticate, employmentController.getOne);
router.put('/employment/:id', isAdmin, employmentController.update);
router.delete('/employment/:id', isAdmin, employmentController.delete);

module.exports = router;
