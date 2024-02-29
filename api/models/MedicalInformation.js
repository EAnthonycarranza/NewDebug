const mongoose = require('mongoose');

const medicalInformationSchema = new mongoose.Schema({
    healthCare: String,
    terminalIllnesses: String,
    currentMedications: [{
        name: { type: String, required: true },
        dosage: { type: String, required: false }, // Make dosage optional
        frequency: String
      }]
});

const MedicalInformation = mongoose.model('MedicalInformation', medicalInformationSchema);
module.exports = MedicalInformation;
