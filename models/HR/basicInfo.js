const mongoose = require('mongoose');
const { Schema } = mongoose;

const HRbasicInfo = new Schema({
    hiclousiaID: String,
    email: String,
    name: String,
    city: String,
    companyName: String,
});

mongoose.model('hrBasicInfo', HRbasicInfo);