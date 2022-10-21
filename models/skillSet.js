const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSetSchema = new Schema({
    googleId: String,
    email: String,
    coreSkills: [
        {
            skillName: String,
            industryExperience: {
                yr: Number,
                mon: Number
            },
            otherExperience: {
                yr: Number,
                mon: Number
            }
        }
    ]
})

mongoose.model('skillSet', skillSetSchema);