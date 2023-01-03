const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    hiclousiaID: String,
    email: String,
    phone: String,
    name: String,
    address: String,  
    age: String, 
    expectedCities: [String],
    linkedIN: String,
    gender: String,
    nationality: String,
    currentCity: String,
    role: String,
    purpose: String,
    experience: {
        year: String,
        month: String
    },
    expectedPosition: String,
    expectedSalary: {
        min: String,
        max: String
    },
    expectedIndustry: String,
    expectedDepartment: [String],
});

mongoose.model('basicInfo', BISchema);