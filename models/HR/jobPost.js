const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobPost = new Schema({
    hiclousiaID: String,
    email: String,
    companyName: String,
    description: String,
    industry: String,
    department: [String],
    skills: [String],
    cities: [String],
    budget: {
        min: String,
        max: String
    },
    experience: {
        min: String,
        max: String,
    }
});

mongoose.model('jobpost', JobPost);