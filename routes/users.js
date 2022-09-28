const router = require('express').Router();
const {
  signUp
} = require('../controllers/users.js')

// Router routes definition
router.post('/signUp', signUp);

module.exports = router;
