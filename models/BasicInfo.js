const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    age: String, 
    city: String,
    gender: String,
    role: String,
    expectedPosition: String,
    expectedSalary: String,
    expectedIndustry: String,
    expectedDepartment: String,
    experienceYears: Number, 
    experienceMonths: Number, 
    currentEmployment: String,
    companyName: String,
    designation: String,
    currentIndustry: String,
    currentDepartment: String
});

mongoose.model('basicInfo', BISchema);