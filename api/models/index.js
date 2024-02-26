const mongoose = require('mongoose');

// Import individual models
const User = require('./User');
const AdmissionAgreement = require('./AdmissionAgreement');
const PersonalInformation = require('./PersonalInformation');
const MedicalInformation = require('./MedicalInformation');
const History = require('./History');
const Education = require('./Education');
const Employment = require('./Employment');

module.exports = {
  User,
  AdmissionAgreement,
  PersonalInformation,
  MedicalInformation,
  History,
  Education,
  Employment,
};
