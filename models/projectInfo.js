const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectInfoSchema = new Schema({
    googleId: String,
    email: String,
    department: String,
    description: String,
    duration: Object,
    startDate: String,
    endDate: String,
    skills: [String],
    industry: String,
    title: String,
    typeOfProject: String
});

mongoose.model('projects', ProjectInfoSchema);