const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/users.js');
const jwt = require('jsonwebtoken');
const secret = require('./secret');

// Passport for authorization
passport.use(new BearerStrategy((token, done) => {

  // Unencrypt the token
  const body = jwt.decode(token, { secret });


  User.findOne({ where: { username: body.user } })
    .then(user => {
      if (!user)
        return done(null, false, { errors: { 'JWT ': 'invalid' } }); //error if this user is not found
      return done(null, user); //if we found we returned
    })
    .catch(done);
}));


module.exports = passport;


// Con bearter  => De esa manera ya pudieramoos validar getGods? ya que no ocupamos body
