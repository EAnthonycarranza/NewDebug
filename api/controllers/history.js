const History = require('../models/History');

exports.create = async (req, res) => {
  try {
    const history = new History(req.body);
    await history.save();
    res.status(201).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const histories = await History.find();
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const history = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
