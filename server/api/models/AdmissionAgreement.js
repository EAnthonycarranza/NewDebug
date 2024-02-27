const mongoose = require('mongoose');

const admissionAgreementSchema = new mongoose.Schema({
    agreementAcknowledgement: {
    studentSignature: String,
    witnessSignature: String,
    dateSigned: String,
    }
});

const AdmissionAgreement = mongoose.model('AdmissionAgreement', admissionAgreementSchema);
module.exports = AdmissionAgreement;