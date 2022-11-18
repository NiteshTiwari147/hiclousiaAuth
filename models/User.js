const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    hiclousiaID: String,
    role: String,
    email: String,
    password: String
});

mongoose.model('users', userSchema);

