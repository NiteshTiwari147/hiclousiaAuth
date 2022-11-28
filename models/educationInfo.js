const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationInfoSchema = new Schema({
    hiclousiaID: String,
    email: String,
    institute: String,
    course: String,
    field_of_course: String,
    start_date: String,
    end_date: String,
    grade: String
});

mongoose.model('education', EducationInfoSchema);