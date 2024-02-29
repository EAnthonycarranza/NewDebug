const Employment = require('../models/Employment');

exports.create = async (req, res) => {
  try {
    const employment = new Employment(req.body);
    await employment.save();
    res.status(201).json(employment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const employments = await Employment.find();
    res.status(200).json(employments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const employment = await Employment.findById(req.params.id);
    if (!employment) {
      return res.status(404).json({ message: 'Employment not found' });
    }
    res.status(200).json(employment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const employment = await Employment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Employment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
