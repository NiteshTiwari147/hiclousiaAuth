const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceInfoSchema = new Schema({
    googleId: String,
    email: String,
    company: String,
    designation: String,
    description: String,
    start_date: String,
    end_date: String,
    skills: [String],
    industry: String,
});

mongoose.model('experiences', ExperienceInfoSchema);