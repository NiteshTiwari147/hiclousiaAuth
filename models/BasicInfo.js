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
    purpose: String,
    expectedPosition: String,
    expectedSalary: String,
    expectedIndustry: String,
    expectedDepartment: String,
});

mongoose.model('basicInfo', BISchema);