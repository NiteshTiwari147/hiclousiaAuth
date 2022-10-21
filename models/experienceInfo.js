const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceInfoSchema = new Schema({
    googleId: String,
    email: String,
    company: String,
    designation: String,
    typeOfExperience: String,
    description: String,
    isCurrent: Boolean,
    industryExperience: {
        yr: Number,
        mo: Number
    },
    skills: [String],
    industry: String,
    department: String
});

mongoose.model('experiences', ExperienceInfoSchema);