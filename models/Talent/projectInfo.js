const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectInfoSchema = new Schema({
    hiclousiaID: String,
    email: String,
    title: String,
    typeOfProject: String,
    description: String,
    outcomes: String,
    duration: Object,
    industry: String,
    department: String,
    startDate: String,
    endDate: String,
    skills: [String],
    location: String,
    manager: String,
    managerContact: String
});

mongoose.model('projects', ProjectInfoSchema);