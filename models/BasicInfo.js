const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    hiclousiaID: String,
    email: String,
    name: String,
    age: String, 
    city: [String],
    gender: String,
    role: String,
    purpose: String,
    expectedPosition: String,
    expectedSalary: {
        min: String,
        max: String
    },
    expectedIndustry: String,
    expectedDepartment: [String],
});

mongoose.model('basicInfo', BISchema);