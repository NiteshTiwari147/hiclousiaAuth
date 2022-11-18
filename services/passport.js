
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = mongoose.model('users');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' },(email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });

  passport.use('google-hr', new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback/hr',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ hiclousiaID: profile.id});   // matching googleID with profile ID 
      if(existingUser) {
          return done(null, existingUser);
      }
      const user = await  new User({hiclousiaID: profile.id, email: profile.emails[0].value, role: 'HR'}).save();
      done(null,user);
  }));

  passport.use('google-talent', new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback/talent',
    proxy: true
},
async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ hiclousiaID: profile.id});   // matching googleID with profile ID 
    if(existingUser) {
        return done(null, existingUser);
    }
    const user = await  new User({hiclousiaID: profile.id, email: profile.emails[0].value, role: 'candidate'}).save();
    done(null,user);
}));
};
