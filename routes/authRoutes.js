const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require("bcryptjs");
require('../models/Talent/BasicInfo');
var customId = require("custom-id");

module.exports = app => {

    app.get('/auth/google/talent', passport.authenticate('google-talent', {
        scope: ['profile', 'email']
    }))

    app.get('/auth/google/hr', passport.authenticate('google-hr', {
        scope: ['profile', 'email']
    }))

    app.get(
        '/auth/google/callback/talent',
        passport.authenticate('google-talent'),
        (req, res) => {
            res.redirect('/home');
        }
    );

    app.get(
        '/auth/google/callback/hr',
        passport.authenticate('google-hr'),
        (req, res) => {
            res.redirect('/home');
        }
    );

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
          if (err) throw err;
          if (!user) res.send({
            err: 'wrong crendentials',
            status: 200
          });
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send({
                user: req.user,
                status: 200
              });
            });
          }
        })(req, res, next);
    });

    app.get('/api/logout', (req, res) => {
        req.logOut()
        res.redirect('/')
    })

    app.post('/api/signin', async (req,res) => {
        const {email, password, role} = req.body;
        if(!email || !password || !role) {
            return res.send({
                err: 'Invalid credentials',
                status: 400
            });
        } else {
            const existingUser = await User.findOne({ email: email});  
            if(existingUser) {
                return res.send({
                    err: 'Already existing',
                    status: 409
                });
            }
            const hashedpassword = await bcrypt.hash(password, 10)
            const user = await new User({
                email: email.toLowerCase(),
                password: hashedpassword,
                role: role,
                hiclousiaID: customId({
                    email: email
                })
            }).save();
            await req.logIn(user, (err) => {
                if (err) { reject(err); }
                    res.send({
                        user,
                        status: 200
                    });
            });
        }
    });

    app.get('/api/current_user', async function (req,res) {
        res.send(req.user);
    })

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
      
        res.redirect('/home')
    }
      
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next();
    }
};
