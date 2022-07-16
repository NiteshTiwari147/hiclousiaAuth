const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    age: String,
    city: String,
    industry: String,
    department: String,
    experienceYears: Number,
    experienceMonths: Number,
    currentEmployment: String,
    companyName: String,
    designation: String,
});

mongoose.model('basicInfo', BISchema);