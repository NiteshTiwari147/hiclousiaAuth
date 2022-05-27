const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectInfoSchema = new Schema({
    googleId: String,
    email: String,
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    skills: [String],
    industry: String
});

mongoose.model('projects', ProjectInfoSchema);