const {PersonalInformation} = require('../models/index');

// Create new personal information
exports.create = async (req, res) => {
console.log("Creating PersonalInformation with data:", req.body);
  try {
    const personalInfo = new PersonalInformation(req.body);
    await personalInfo.save();
    res.status(201).send(personalInfo);
  } catch (error) {
    console.error("Error creating PersonalInformation:", error);
    res.status(400).send(error);
  }
};

// Get all personal information
exports.getAll = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.find({});
    res.status(200).send(personalInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single entry of personal information
exports.getOne = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findById(req.params.id);
    if (!personalInfo) {
      return res.status(404).send();
    }
    res.status(200).send(personalInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update personal information
exports.update = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!personalInfo) {
      return res.status(404).send();
    }
    res.status(200).send(personalInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete personal information
exports.delete = async (req, res) => {
  try {
    const personalInfo = await PersonalInformation.findByIdAndDelete(req.params.id);
    if (!personalInfo) {
      return res.status(404).send();
    }
    res.status(200).send(personalInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};
