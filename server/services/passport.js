const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (error, user) => {
    if (error) { return done(error); }
    if (!user) { return done(null, false); }
    
    user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (!isMatch) { return done(null, false); }

      done(null, user);
    });
  });
});

// This is like the [Authorize] attribute in ASP.NET Core MVC.

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (error, user) => {
    if (error) { return done(error, false); }
    if (!user) { return done(null, false); }

    done(null, user);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);