const mongoose = require('mongoose');

require('../models/HR/basicInfo');
require('../models/HR/jobPost');
require('../models/Talent/talentReq');
require('../models/BasicInfo');
var customId = require("custom-id");

module.exports = app => {
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
      
        res.redirect('/')
    }

    app.get('/fetch/hr', checkAuthenticated,  async function(req,res, done) {
      const basicInfo = mongoose.model('hrBasicInfo');
      try {
        if(req && req.user && req.user.email) {
            const candidate = await basicInfo.findOne({email: req.user.email})
            res.send(candidate);
        }
        res.status({status: 204});
      }
      catch (err) {
          console.log("HR not found ",err);
          res.send({status: 204})
      }
    })

    app.get('/fetch/talent', checkAuthenticated, async function(req,res, done) {
      const talentReq = mongoose.model('talentReq');
      try { 
        const {
          industry,
          department,
        } = req.query;

        const candidates = await talentReq.find({expectedIndustry: industry, expectedDepartment: {
          $elemMatch: {
            $in: department
          }
        }});
        res.send(candidates);
        res.status(200);

      } catch(err) {
        console.log("Somewith went wrong while fetching talent ",err);
        res.send({status: 500})
      }
    } )

    app.get('/fetch/jobs', checkAuthenticated,  async function(req,res, done) {
      const postedJobSchema = mongoose.model('jobpost');
      try {
        if(req && req.user && req.user.email) {
            const postedJobs = await postedJobSchema.find({email: req.user.email})
            res.send(postedJobs);
        }
        res.status({status: 204});
      }
      catch (err) {
          console.log("Somewith went wrong not found ",err);
          res.send({status: 204})
      }
    })

    app.get('/fetch/jobDetail', checkAuthenticated,  async function(req,res, done) {
      const postedJobSchema = mongoose.model('jobpost');
      try {
        const {
          jobID
        } = req.query;
        if(req && req.query && jobID) {
            const postedJob = await postedJobSchema.findOne({jobID: jobID})
            res.send(postedJob);
        }
        res.status({status: 204});
      }
      catch (err) {
          console.log("Somewith went wrong not found ",err);
          res.send({status: 204})
      }
    })

    app.post('/create/hr', checkAuthenticated, async function (req,res) {
      const basicInfo = mongoose.model('hrBasicInfo');
      try {
        const { hiclousiaID, email } = req.user;
        const { name, companyName, city } = req.body;
        console.log('saving HR profile data...', hiclousiaID, email, name, companyName, city);
        const response = await new basicInfo({hiclousiaID, email, name, companyName, city}).save()
        res.send({response, status: 200});
        console.log("Succesfully saved data");
      } catch(err) {
          console.log("error occured while saving HR Info", err);
          res.send({status: 500});
      }    
    })

    app.post('/create/jobPost', checkAuthenticated, async function (req,res) {
      const jobPost = mongoose.model('jobpost');
      try {
        const { hiclousiaID, email } = req.user;
        const {
          companyName,
          experience,
          description,
          industry,
          department,
          skills,
          cities,
          budget
        } = req.body;
        const jobID = customId({
          hiclousiaID: hiclousiaID,
          email: email,
          companyName: companyName,
        })
        const existingJob = await jobPost.findOne({jobID: jobID})
        while(existingJob) {
          jobID = customId({
            hiclousiaID: hiclousiaID,
            email: email,
            companyName: companyName,
          })
          existingJob = await jobPost.findOne({jobID: jobID})
        }
        const response = await new jobPost({hiclousiaID,
          jobID,
          email,
          companyName,
          experience,
          description,
          industry,
          department,
          skills,
          cities,
          budget}).save();
        res.send({response, status: 200});
        console.log("Succesfully saved data");
      } catch(err) {
        console.log("error occured while saving Job posting", err);
        res.send({status: 500});
      }
    });

}