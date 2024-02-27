const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    highestGradeCompleted: String,
    yearGraduated: String,
    collegeHoursCompleted: Number,
    degree: String // e.g., BSc, BA, etc.
});

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;
