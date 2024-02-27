const AdmissionAgreement = require('../models/AdmissionAgreement');

exports.create = async (req, res) => {
  try {
    const admissionAgreement = new AdmissionAgreement(req.body);
    await admissionAgreement.save();
    res.status(201).json(admissionAgreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const admissionAgreements = await AdmissionAgreement.find();
    res.status(200).json(admissionAgreements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const admissionAgreement = await AdmissionAgreement.findById(req.params.id);
    if (!admissionAgreement) {
      return res.status(404).json({ message: 'Admission Agreement not found' });
    }
    res.status(200).json(admissionAgreement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const admissionAgreement = await AdmissionAgreement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(admissionAgreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await AdmissionAgreement.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
