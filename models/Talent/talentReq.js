const mongoose = require('mongoose');
const { Schema } = mongoose;

const TalentReqSchema = new Schema({
    hiclousiaID: String,
    email: String,
    name: String,
    gender: String,
    skills: Object,
    cities: [String],
    budget: {
        min: String,
        max: String
    },
    experience: {
        year: String,
        month: String
    },
    skillScore: Number,
    educationScore: Number,
    industryScore: Number,
    selfScore: Number,
    expectedIndustry: String,
    expectedDepartment: [String],
});

mongoose.model('talentReq', TalentReqSchema);