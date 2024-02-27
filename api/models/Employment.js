const mongoose = require('mongoose');

const employmentSchema = new mongoose.Schema({
    currentlyEmployed: Boolean,
    employmentType: String, // e.g., Full-time, Part-time, Self-employed
    employer: String,
    occupation: String,
    hourlyIncome: Number,
    paymentFrequency: String, // e.g., Weekly, Bi-weekly, Monthly
    specialSkills: String
});

const Employment = mongoose.model('Employment', employmentSchema);
module.exports = Employment;
