const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.js');

// Passport for authorization
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',

}, (email, password, done) => {
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user || !User.validatePassword(password, user.passwordSalt, user.passwordHash))
        return done(null, false, { errors: { 'email or password': 'unfound' } }); //error if this user is not found
      return done(null, user); //if we found we returned
    })
    .catch(done);
}))


module.exports = passport;
