const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSetSchema = new Schema({
    googleId: String,
    email: String,
    coreSkills: [
        {
            skillName: String,
            skillPoint: Number
        }
    ]
})

mongoose.model('skillSet', skillSetSchema);