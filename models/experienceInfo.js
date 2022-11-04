const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceInfoSchema = new Schema({
    googleId: String,
    email: String,
    company: String,
    department: String,
    designation: String,
    duration: Object,
    endDate: String,
    industry: String,
    isCurrent: Boolean,
    startDate: String,
    skills: [String],
    typeOfExperience: String
});

mongoose.model('experiences', ExperienceInfoSchema);