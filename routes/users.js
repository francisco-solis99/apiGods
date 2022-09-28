const router = require('express').Router();
const {
  signUp,
  login
} = require('../controllers/users.js')

// Router routes definition
router.post('/signUp', signUp);
router.post('/login', login);

module.exports = router;
