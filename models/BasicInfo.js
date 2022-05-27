const mongoose = require('mongoose');
const { Schema } = mongoose;

const BISchema = new Schema({
    googleId: String,
    email: String,
    firstName: String,
    lastName: String,
    age: String,
    location: String,
    contactNumber: String,
    address: String
});

mongoose.model('basicInfo', BISchema);