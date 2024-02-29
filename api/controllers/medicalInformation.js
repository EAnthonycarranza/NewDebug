const MedicalInformation = require('../models/MedicalInformation');

exports.create = async (req, res) => {
  try {
    const medicalInformation = new MedicalInformation(req.body);
    await medicalInformation.save();
    res.status(201).json(medicalInformation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const medicalInformations = await MedicalInformation.find();
    res.status(200).json(medicalInformations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const medicalInformation = await MedicalInformation.findById(req.params.id);
    if (!medicalInformation) {
      return res.status(404).json({ message: 'Medical Information not found' });
    }
    res.status(200).json(medicalInformation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const medicalInformation = await MedicalInformation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(medicalInformation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await MedicalInformation.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
