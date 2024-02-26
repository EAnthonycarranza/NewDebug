const express = require('express');
const router = express.Router();

// Import controllers
//const admissionAgreementController = require('../controllers/admissionAgreement');
const personalInformationController = require('../controllers/personalInformation');
//const medicalInformationController = require('../controllers/medicalInformation');
//const historyController = require('../controllers/history');
//const educationController = require('../controllers/education');
//const employmentController = require('../controllers/employment');

// Admission Agreement routes
//router.get('/admissionAgreement', admissionAgreementController.getAll);
//router.post('/admissionAgreement', admissionAgreementController.create);
//router.get('/admissionAgreement/:id', admissionAgreementController.getOne);
//router.put('/admissionAgreement/:id', admissionAgreementController.update);
//router.delete('/admissionAgreement/:id', admissionAgreementController.delete);

// Personal Information routes
router.get('/personalInformation', personalInformationController.getAll);
router.post('/personalInformation', personalInformationController.create);
router.get('/personalInformation/:id', personalInformationController.getOne);
router.put('/personalInformation/:id', personalInformationController.update);
router.delete('/personalInformation/:id', personalInformationController.delete);

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
