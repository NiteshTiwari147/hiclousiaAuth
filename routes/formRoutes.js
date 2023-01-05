const mongoose = require('mongoose');

require('../models/Talent/BasicInfo');
require('../models/Talent/projectInfo');
require('../models/Talent/educationInfo');
require('../models/Talent/experienceInfo');
require('../models/HR/jobPost');
require('../models/skillSet');
require('../models/Talent/talentReq');
var customId = require("custom-id");

const { processSkillData, calculateExperience, calculateIndustryCompentency, calculateEducationCompentency }  =  require('../services/stats');

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
        }
        catch (err) {
            console.log("candidate skillset not found ",err);
            res.send({status: 204})
        } 
    })

    app.get('/fetch/compentecy', checkAuthenticated, async function(req, res, done) {
        const talentReq = mongoose.model('talentReq');
        try {
            if(req, req.user && req.user.email) {
                const compentency = await talentReq.findOne({email: req.user.email});
                res.send(compentency);
            } 
        }
        catch (err) {
            console.log("compentency not found ",err);
            res.send({status: 204})
        } 
    })

    app.get('/fetch/Education',checkAuthenticated, async function(req,res, done) {
        const educationSchema = mongoose.model('education');
        try {
            if(req && req.user && req.user.email) {
                const candidate = await educationSchema.find({email: req.user.email})
                res.send(candidate);
            }
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    })

    app.get('/fetch/Experience', checkAuthenticated, async function(req,res, done) {
        const experienceSchema = mongoose.model('experiences');
        try {
            if(req && req.user && req.user.email) {
                const experiences = await experienceSchema.find({email: req.user.email});
                const totalExp  = calculateExperience(experiences)
                const expData = {
                    experiences: experiences,
                    totalExp: totalExp
                }
                res.send({expData, status: 200});
            }
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
        }
        catch (err) {
            console.log("candidate not found ",err);
            res.send({status: 204})
        }   
    });

    app.get('/fetch/relevantJobs', checkAuthenticated, async function(req,res, done) {
        const postedJobsSchema = mongoose.model('jobpost');
        try {
            const {
                industry,
                department,
            } = req.query;
            const relevantJobs = await postedJobsSchema.find({industry: industry, department: {
                $elemMatch: {
                  $in: department
                }
            }});
            res.send(relevantJobs);
        } catch(err) {
            console.log("Somewith went wrong while fetching jobs ",err);
            res.send({status: 500})
        }
    });


    app.post('/create/candidate', checkAuthenticated, async function (req,res) {
        const basicInfo = mongoose.model('basicInfo');
        const talentReq = mongoose.model('talentReq');
        try {
            const { name,
                phone,
                address,
                age, 
                expectedCities,
                linkedIN,
                gender,
                nationality,
                currentCity,
                role,
                purpose,
                experience,
                expectedPosition,
                expectedSalary,
                expectedIndustry,
                expectedDepartment } = req.body;
            const { hiclousiaID, email } = req.user;
            const response = await new basicInfo({hiclousiaID, 
                email, 
                name,
                phone,
                address,
                age, 
                expectedCities,
                linkedIN,
                gender,
                nationality,
                currentCity,
                role,
                purpose,
                experience,
                expectedPosition,
                expectedSalary,
                expectedIndustry,
                expectedDepartment}).save(); 
            await new talentReq({
                hiclousiaID,
                email, 
                name,
                cities: expectedCities,
                gender,
                skills: null,
                budget: {
                   min: expectedSalary.min,
                   max: expectedSalary.max
                },
                experience: {
                    year: experience.year,
                    month: experience.month
                },
                skillScore: 0,
                educationScore: 0,
                industryScore: 0,
                selfScore: 0,
                expectedIndustry,
                expectedDepartment}).save();
            res.send({response: 204});
        } catch(err) {
            res.send({response: 500});
        }
    })

    app.post('/create/project', checkAuthenticated, async function (req,res) {
        const project =  mongoose.model('projects');
        const talentReq = mongoose.model('talentReq');
        try {
            const { title, description, typeOfProject,outcomes, startDate, endDate, skills, duration, industry, department, location, manager, managerContact} = req.body;
            const { hiclousiaID, email } = req.user;
            const response = await new project({hiclousiaID, email, title, description, typeOfProject,outcomes, startDate, endDate, skills, duration, industry, department, location, manager, managerContact}).save();    
            const talentReqData = await talentReq.findOne({email: req.user.email});
            talentReqData.selfScore = Math.floor(Math.random() * 100) + 60;
            const newTalenReq = { $set: talentReqData };
            await talentReq.updateOne({email: req.user.email}, newTalenReq);
            res.send(response);
        } catch(err) {
            console.log("error occured while saving project ",err);
            res.send({status: 304})
        }
        
    })

    app.post('/update/skills', checkAuthenticated, async function (req,res) {
        const skillList = mongoose.model('skillSet');
        const talentReq = mongoose.model('talentReq');
        try {
            if(req, req.user && req.user.hiclousiaID) {
                const candidateSkillSet = await skillList.findOne({email: req.user.email});
                const talentReqData = await talentReq.findOne({email: req.user.email});
                if(candidateSkillSet === null) {
                    const processedSKillList = processSkillData([], req.body)
                    const { hiclousiaID, email } = req.user;
                    const response = await new skillList({hiclousiaID, email, processedSKillList}).save();
                    talentReqData.skills = processedSKillList;
                    let skillScore = 0;
                    let skillCount = 0;
                    processedSKillList.map(skill => {
                        skillCount++;
                        skillScore = skillScore + skill.score;
                    });
                    talentReqData.skillScore = skillScore/skillCount;
                    const newTalenReq = { $set: talentReqData };
                    await talentReq.updateOne({email: req.user.email}, newTalenReq);
                    res.send({response});
                } else {
                    const processedSKillList = processSkillData(candidateSkillSet.processedSKillList, req.body)
                    const { hiclousiaID, email } = req.user;
                    var newvalues = { $set: { hiclousiaID, email, processedSKillList} };
                    talentReqData.skills = processedSKillList;
                    let skillScore = 0;
                    let skillCount = 0;
                    processedSKillList.map(skill => {
                        skillCount++;
                        skillScore = skillScore + skill.score;
                    });
                    talentReqData.skillScore = skillScore/skillCount;
                    console.log(skillScore, skillCount, talentReqData.skillScore);
                    const newTalenReq = { $set: talentReqData };
                    const resposne = await skillList.updateOne({hiclousiaID: hiclousiaID}, newvalues);
                    await talentReq.updateOne({email: req.user.email}, newTalenReq);
                    res.send({resposne});
                } 
            }
        }
        catch (err) {
            console.log("candidate skillset not found ",err);
            res.send({status: 204})
        } 
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
        const talentReq = mongoose.model('talentReq');
        try {
            const { institute, course, field_of_course, start_date, end_date, grade, institueName} = req.body;
            const { hiclousiaID, email } = req.user;
            const response = await new education({hiclousiaID, email, institute, course, field_of_course, start_date, end_date, grade, institueName}).save();
            const talentReqData = await talentReq.findOne({email: req.user.email});
            const educationCompentency = calculateEducationCompentency(institute, course);
            talentReqData.educationScore = talentReqData.educationScore + educationCompentency;
            const newTalenReq = { $set: talentReqData };
            await talentReq.updateOne({email: req.user.email}, newTalenReq);
            res.send(response);
        } catch (err) {
            console.log("Error occured while saving education ",err);
            res.send({status: 304})
        }
    })
    app.post('/create/experience', checkAuthenticated, async function (req,res) {
        const experience =  mongoose.model('experiences');
        const talentReq = mongoose.model('talentReq');
        try {
            const { company, designation, duration, isCurrent, endDate, skills, industry, department, typeOfExperience, startDate, location, manager, managerContact, responsibility} = req.body;
            const { hiclousiaID, email } = req.user;
            const response = await new experience({hiclousiaID, email, company, designation, duration, isCurrent, endDate, skills, industry, department, typeOfExperience, startDate, location, manager, managerContact, responsibility}).save();
            const talentReqData = await talentReq.findOne({email: req.user.email});
            const expCompentency = calculateIndustryCompentency(typeOfExperience, duration);
            talentReqData.industryScore =  talentReqData.industryScore + expCompentency;
            const newTalenReq = { $set: talentReqData };
            await talentReq.updateOne({email: req.user.email}, newTalenReq);
            res.send(response);
        } catch(err) {
            console.log("Error occured while saving experience ",err);
            res.send({status: 304})
        }
    })

    app.put('/update/expectation',checkAuthenticated, async function (req, res) {
        const talentReq = mongoose.model('talentReq');
        const basicInfo = mongoose.model('basicInfo');
        try {
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
            console.log(req.body, req.user);
            var newValues = { $set: {
                hiclousiaID, 
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
                expectedDepartment
            }}
            const resp = await basicInfo.updateOne({hiclousiaID: hiclousiaID}, newValues);
            const talentReqData = await talentReq.findOne({email: email});
            talentReqData.cities = city;
            talentReqData.budget.min = expectedSalary.min;
            talentReqData.budget.max = expectedSalary.max;
            talentReqData.expectedIndustry = expectedIndustry;
            talentReqData.expectedDepartment = expectedDepartment;
            const newTalenReq = { $set: talentReqData };
            await talentReq.updateOne({hiclousiaID: hiclousiaID}, newTalenReq);
            res.send(resp);
        } catch(err) {
            console.log("error occured while update ",err);
            res.send({status: 304})
        }

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

    app.put('/delete/project', checkAuthenticated,async function (req, res) {
        const projects = mongoose.model('projects');
        try {
            if(req && req.user && req.user.hiclousiaID) {
                const { id } = req.body
                const response = await projects.deleteOne({_id: id});
                res.send({response});          
            }
        } catch (err) {
            console.log("error occured while delete ",err);
            res.send({status: 204})
        } 
    });
}