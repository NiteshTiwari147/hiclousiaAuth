const mongoose = require('mongoose');
require('../models/BasicInfo');
require('../models/projectInfo');
require('../models/educationInfo');
require('../models/experienceInfo');

module.exports = app => {

    app.get('/fetch/Candidate', async function(req,res, done) {
        const basicInfo = mongoose.model('basicInfo');
        try {
            if(req.user.googleId) {
                const candidate = await basicInfo.findOne({googleId: req.user.googleId})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })
    app.post('/create/candidate', async function (req,res) {
        const basicInfo = mongoose.model('basicInfo');
        const { firstName, lastName, age, location, contactNumber, address } = req.body;
        const { googleId, email } = req.user;
        const response = await new basicInfo({googleId, email, firstName, lastName, age, location, contactNumber, address}).save(); 
        res.send(req.user);
    })
    app.post('/create/project',async function (req,res) {
        const project =  mongoose.model('projects');
        const { title, description, start_date, end_date, skills, industry} = req.body;
        const { googleId, email } = req.user;
        const response = await new project({googleId, email, title, description, start_date, end_date, skills, industry}).save();
        res.send(req.user);
    })
    app.post('/create/education',async function (req,res) {
        const education =  mongoose.model('education');
        const { institute, course, field_of_course, start_date, end_date, industry, grade} = req.body;
        const { googleId, email } = req.user;
        const response = await new education({googleId, email, institute, course, field_of_course, start_date, end_date, industry, grade}).save();
        res.send(req.user);
    })
    app.post('/create/experience',async function (req,res) {
        const experience =  mongoose.model('experiences');
        const { company, designation, description, start_date, end_date, skills, industry} = req.body;
        const { googleId, email } = req.user;
        const response = await new experience({googleId, email, company, designation, description, start_date, end_date, skills, industry}).save();
        res.send(req.user);
    })
}