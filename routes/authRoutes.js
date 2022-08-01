const passport = require('passport');
const mongoose = require('mongoose');
require('../models/BasicInfo');

module.exports = app => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/home');
        }
    );

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', async function (req,res) {
        res.send(req.user);
    })
};
