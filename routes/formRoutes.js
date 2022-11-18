const mongoose = require('mongoose');

require('../models/BasicInfo');
require('../models/projectInfo');
require('../models/educationInfo');
require('../models/experienceInfo');
require('../models/skillSet');
var customId = require("custom-id");

const { processSkillData }  =  require('../services/stats');

module.exports = app => {

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
      
        res.redirect('/')
    }

    app.get('/fetch/Candidate', checkAuthenticated, async function(req,res, done) {
        const basicInfo = mongoose.model('basicInfo');
        try {
            if(req && req.user && req.user.email) {
                const candidate = await basicInfo.findOne({email: req.user.email})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    });

    app.get('/fetch/skillSet', checkAuthenticated, async function(req, res, done) {
        const skillSet = mongoose.model('skillSet');
        try {
            if(req, req.user && req.user.email) {
                const candidateSkillSet = await skillSet.findOne({email: req.user.email});
                res.send(candidateSkillSet);
            }
            res.status({status: 200});   
        }
        catch (err) {
            console.log("candidate skillset not found ",err);
            res.send({status: 204})
        } 
    })

    app.get('/fetch/Education',checkAuthenticated, async function(req,res, done) {
        const basicInfo = mongoose.model('education');
        try {
            if(req && req.user && req.user.email) {
                const candidate = await basicInfo.find({email: req.user.email})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })

    app.get('/fetch/Experience', checkAuthenticated, async function(req,res, done) {
        const basicInfo = mongoose.model('experiences');
        try {
            if(req && req.user && req.user.email) {
                const candidate = await basicInfo.find({email: req.user.email})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })

    app.get('/fetch/Project', checkAuthenticated, async function(req,res, done) {
        const projects = mongoose.model('projects');
        try {
            if(req && req.user && req.user.email) {
                const projectList = await projects.find({email: req.user.email})
                res.send(projectList);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })


    app.post('/create/candidate', checkAuthenticated, async function (req,res) {
        const basicInfo = mongoose.model('basicInfo');
        const { name,
            age, 
            city,
            gender,
            role,
            purpose,
            expectedPosition,
            expectedSalary,
            expectedIndustry,
            expectedDepartment } = req.body;
        const { hiclousiaID, email } = req.user;
        const response = await new basicInfo({hiclousiaID, 
            email, 
            name,
            age, 
            city,
            purpose,
            gender,
            role,
            expectedPosition,
            expectedSalary,
            expectedIndustry,
            expectedDepartment}).save(); 
        res.send({response: 204});
    })

    app.post('/create/project', checkAuthenticated, async function (req,res) {
        const project =  mongoose.model('projects');
        const { title, description, typeOfProject,  startDate, endDate, skills, duration, industry, department} = req.body;
        const { hiclousiaID, email } = req.user;
        const response = await new project({hiclousiaID, email, title, description, typeOfProject,  startDate, endDate, skills, duration, industry, department}).save();    
        res.send(response);
    })

    app.post('/update/skills', checkAuthenticated, async function (req,res) {
        const skillList = mongoose.model('skillSet');
        try {
            if(req, req.user && req.user.hiclousiaID) {
                const candidateSkillSet = await skillList.findOne({email: req.user.email});
                if(candidateSkillSet === null) {
                    const processedSKillList = processSkillData([], req.body)
                    const { hiclousiaID, email } = req.user;
                    const response = await new skillList({hiclousiaID, email, processedSKillList}).save();
                    res.send({response});
                } else {
                    const processedSKillList = processSkillData(candidateSkillSet.processedSKillList, req.body)
                    const { hiclousiaID, email } = req.user;
                    var newvalues = { $set: { hiclousiaID, email, processedSKillList} };
                    const resposne = await skillList.updateOne({hiclousiaID: hiclousiaID}, newvalues)
                    res.send({resposne});
                }
            }
            res.status({status: 200});   
        }
        catch (err) {
            console.log("candidate skillset not found ",err);
            res.send({status: 204})
        } 
        // let coreSkills = [];
        // // skillsObj.map( skill => {
        // //     coreSkills.push({
        // //         skillName: skill.skillName.toLowerCase().trim(),
        // //         industryExperience: skill.industryExperience,
        // //         otherExperience: skill.otherExperience
        // //     })
        // // })
        // const { hiclousiaID, email } = req.user;
        // var newvalues = { $set: { hiclousiaID, email, coreSkills} };
        // console.log("body: ",skillsObj," processed: ",coreSkills);
        // res.send({});
        // const resposne = await skillList.updateOne({hiclousiaID: hiclousiaID}, newvalues)
        // res.send({resposne});
    });

    app.post('/create/skills', checkAuthenticated, async function (req,res) {
        const skillList = mongoose.model('skillSet');
        let coreSkills = [];
        const { hiclousiaID, email } = req.user;
        var newvalues = { $set: { hiclousiaID, email, coreSkills} };
        const response = await new skillList({hiclousiaID, email, coreSkills}).save();
        res.send({response});
    });

    app.post('/create/education', checkAuthenticated, async function (req,res) {
        const education =  mongoose.model('education');
        const { institute, course, field_of_course, start_date, end_date, grade} = req.body;
        const { hiclousiaID, email } = req.user;
        const response = await new education({hiclousiaID, email, institute, course, field_of_course, start_date, end_date, grade}).save();
        res.send(response);
    })
    app.post('/create/experience', checkAuthenticated, async function (req,res) {
        const experience =  mongoose.model('experiences');
        const { company, designation, duration, isCurrent, endDate, skills, industry, department, typeOfExperience, startDate} = req.body;
        const { hiclousiaID, email } = req.user;
        const response = await new experience({hiclousiaID, email, company, designation, duration, isCurrent, endDate, skills, industry, department, typeOfExperience, startDate}).save();
        res.send(response);
    })

    app.put('/update/education', checkAuthenticated, async function (req, res) {
        const education =  mongoose.model('education');
        try {
            if(req && req.user && req.user.hiclousiaID) {
                const { id } = req.body
                const { institute, course, field_of_course, start_date, end_date, grade} = req.body;
                var newvalues = { $set: { id, institute, course, field_of_course, start_date, end_date, grade} };
                const response = await education.updateOne({_id: id}, newvalues)
                res.send({response});          
            }
            
        } catch(err) {
            console.log("error occured while update ",err);
            res.send({status: 204})
        }
    });

    app.put('/delete/education', checkAuthenticated, async function (req, res) {
        const education =  mongoose.model('education');
        try {
            if(req && req.user && req.user.hiclousiaID) {
                const { id } = req.body
                const response = await education.deleteOne({_id: id});
                res.send({response});          
            }
        }
        catch (err) {
            console.log("error occured while delete ",err);
            res.send({status: 204})
        }   
    });

    app.put('/update/experience', checkAuthenticated, async function (req, res) {
        const experience =  mongoose.model('experiences');
        try {
            if(req && req.user && req.user.hiclousiaID) {
                const { id } = req.body
                const { company, designation, description, isCurrent, industryExperience, skills, industry, department, typeOfExperience} = req.body;
                var newvalues = { $set: { id, company, designation, description, isCurrent, industryExperience, skills, industry, department, typeOfExperience} };
                const response = await experience.updateOne({_id: id}, newvalues)
                res.send({response});          
            }
        } catch(err) {
            console.log("error occured while update ",err);
            res.send({status: 204})
        }
        
    });

    app.put('/delete/experience', checkAuthenticated, async function (req, res) {
        const experience =  mongoose.model('experiences');
        try {
            if(req && req.user && req.user.hiclousiaID) {
                const { id } = req.body
                const response = await experience.deleteOne({_id: id});
                res.send({response});          
            }
        }
        catch (err) {
            console.log("error occured while delete ",err);
            res.send({status: 204})
        }   
    })
}