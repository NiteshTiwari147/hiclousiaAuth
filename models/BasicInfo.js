const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    dob: String,
    phone: String,
    applyingFor: String,
    experience: String,
    nationality: String,
    address: String,
    city: String,
    state: String,
    zip: String,
});

mongoose.model('basicInfo', BISchema);