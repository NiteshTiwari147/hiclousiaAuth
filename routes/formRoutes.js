const mongoose = require('mongoose');
require('../models/BasicInfo');
require('../models/projectInfo');
require('../models/educationInfo');
require('../models/experienceInfo');
require('../models/skillSet');

module.exports = app => {

    app.get('/fetch/Candidate', async function(req,res, done) {
        const basicInfo = mongoose.model('basicInfo');
        try {
            if(req && req.user && req.user.googleId) {
                const candidate = await basicInfo.findOne({googleId: req.user.googleId})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    });

    app.get('/fetch/skillSet', async function(req, res, done) {
        const skillSet = mongoose.model('skillSet');
        try {
            if(req, req.user && req.user.googleId) {
                const candidateSkillSet = await skillSet.findOne({googleId: req.user.googleId});
                res.send(candidateSkillSet);
            }
            res.status({status: 200});   
        }
        catch (err) {
            console.log("candidate skillset not found ",err);
            res.send({status: 204})
        } 
    })

    app.get('/fetch/Education', async function(req,res, done) {
        const basicInfo = mongoose.model('education');
        try {
            if(req && req.user && req.user.googleId) {
                const candidate = await basicInfo.find({googleId: req.user.googleId})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })

    app.get('/fetch/Experience', async function(req,res, done) {
        const basicInfo = mongoose.model('experiences');
        try {
            if(req && req.user && req.user.googleId) {
                const candidate = await basicInfo.find({googleId: req.user.googleId})
                res.send(candidate);
            }
            res.status({status: 204});
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })

    app.get('/fetch/Project', async function(req,res, done) {
        const projects = mongoose.model('projects');
        try {
            if(req && req.user && req.user.googleId) {
                const projectList = await projects.find({googleId: req.user.googleId})
                res.send(projectList);
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
        const { name,
            age, 
            city,
            gender,
            role,
            expectedPosition,
            expectedSalary,
            expectedIndustry,
            expectedDepartment } = req.body;
        const { googleId, email } = req.user;
        const response = await new basicInfo({googleId, 
            email, 
            name,
            age, 
            city,
            gender,
            role,
            expectedPosition,
            expectedSalary,
            expectedIndustry,
            expectedDepartment}).save(); 
        res.send({response: 204});
    })

    app.post('/create/project',async function (req,res) {
        const project =  mongoose.model('projects');
        const skillSet = mongoose.model('skillSet');
        const { title, description, start_date, end_date, skills, industry, department} = req.body;
        const { googleId, email } = req.user;
        const candidateSkillSet = await skillSet.findOne({googleId: req.user.googleId});
        var coreSkills = [];
        if(candidateSkillSet != null) {
            coreSkills = candidateSkillSet.coreSkills;
            skills.map(skill => {
                let found_flag = false;
                for(var i=0;i<coreSkills.length; i++) {
                    if(skill.toLowerCase().trim() === coreSkills[i].skillName) {
                        found_flag = true;
                        coreSkills[i].skillPoint++;
                        break;
                    }
                }
                if(found_flag === false) {
                    coreSkills.push({
                        skillName: skill.toLowerCase().trim(),
                        skillPoint: 1
                    })
                }
            });
            skillSet.updateOne({
                googleId,
                email,
                coreSkills
            },function(err,result){
                if(err){
                    console.log(err);
                }else{
                    console.log("Skills Saved To database");
                }
            });
        } 
        else {
            skills.map( skill => {
                coreSkills.push({
                    skillName: skill.toLowerCase().trim(),
                    skillPoint: 1
                })
            })
            const resposne = await new skillSet({googleId, email, coreSkills }).save();
            console.log("New Skils Saved To database");
        }

        const response = await new project({googleId, email, title, description, start_date, end_date, skills, industry, department}).save();    
        res.send(response);
    })

    app.post('/create/skills',async function (req,res) {
        const skillList = mongoose.model('skillSet');
        const { skillsObj } = req.body;
        let coreSkills = [];
        skillsObj.map( skill => {
            coreSkills.push({
                skillName: skill.name.toLowerCase().trim(),
                industryExperience: skill.industryExperience,
                otherExperience: skill.otherExperience
            })
        })
        const { googleId, email } = req.user;
        const response = await new skillList({googleId, email, coreSkills}).save();
        res.send({status: 204});
    })
    app.post('/create/education',async function (req,res) {
        const education =  mongoose.model('education');
        const { institute, course, field_of_course, start_date, end_date, grade} = req.body;
        const { googleId, email } = req.user;
        const response = await new education({googleId, email, institute, course, field_of_course, start_date, end_date, grade}).save();
        res.send(response);
    })
    app.post('/create/experience',async function (req,res) {
        const experience =  mongoose.model('experiences');
        const { company, designation, description, isCurrent, industryExperience, skills, industry, department, typeOfExperience} = req.body;
        const { googleId, email } = req.user;
        const response = await new experience({googleId, email, company, designation, description, isCurrent, industryExperience, skills, industry, department, typeOfExperience}).save();
        res.send(response);
    })

    app.put('/update/education', async function (req, res) {
        const education =  mongoose.model('education');
        try {
            if(req && req.user && req.user.googleId) {
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

    app.put('/delete/education', async function (req, res) {
        const education =  mongoose.model('education');
        try {
            if(req && req.user && req.user.googleId) {
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

    app.put('/update/experience', async function (req, res) {
        const experience =  mongoose.model('experiences');
        try {
            if(req && req.user && req.user.googleId) {
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

    app.put('/delete/experience', async function (req, res) {
        const experience =  mongoose.model('experiences');
        try {
            if(req && req.user && req.user.googleId) {
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