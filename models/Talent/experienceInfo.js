const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceInfoSchema = new Schema({
    hiclousiaID: String,
    email: String,
    company: String,
    designation: String,
    typeOfExperience: String,
    isCurrent: Boolean,
    duration: Object,
    industry: String,
    department: String,
    startDate: String,
    endDate: String,
    skills: [String],
    location: String,
    manager: String,
    managerContact: String,
    responsibility: String,
});

mongoose.model('experiences', ExperienceInfoSchema);