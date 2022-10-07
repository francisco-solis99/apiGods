const secret = require('./secret.js');
const { expressjwt } = require('express-jwt');//for valite the jwt

// Funtion to get the JWT from the HTTP header
function getTokenFromHeader(req) {
  // Bearer <JWT>
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

// middleware that need it's JWT token
const auth = {
  // middleware required
  required: (req, res, next) => {
    if (req.user) return next();
    if (!req.auth || !req.auth.user) return res.sendStatus(401);
    req.bypass = true;
    next();
  },
  // middleware that is optional
  optional: expressjwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    cardProperty: 'card',
    credentialsRequired: false
  }),

  // middleware for admin
  isAdmin: (req, res, next) => {
    if (req.bypass) return next();
    if (!req.auth) return res.sendStatus(401); // user not found
    if (req.auth.user !== 'admin' && req.auth.user !== 'admin3') return res.sendStatus(403); //just the admin (prohibido)
    next();
  },

  // middleware premium
  isPremium: (req, res, next) => {
    // console.log(req.auth);
    if (!req.auth) return res.sendStatus(401);
    if (!req.auth.card) return res.sendStatus(403); //just the premiun with card (prohibido)
    next();
  }
};


module.exports = auth;
