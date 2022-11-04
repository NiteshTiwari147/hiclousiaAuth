const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    skillName: String,
    types: [
        {
            typeName: String,
            duration: Object
        }
    ],
    score: Number
})

const skillSetSchema = new Schema({
    googleId: String,
    email: String,
    processedSKillList: Object
})

mongoose.model('skillSet', skillSetSchema);