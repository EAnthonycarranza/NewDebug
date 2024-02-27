const mongoose = require('mongoose');

const medicalInformationSchema = new mongoose.Schema({
    healthCare: String,
    terminalIllnesses: [String],
    currentMedications: [{
      name: String,
      dosage: String,
      frequency: String
    }]
});

const MedicalInformation = mongoose.model('MedicalInformation', medicalInformationSchema);
module.exports = MedicalInformation;
