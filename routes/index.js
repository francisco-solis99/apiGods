const router = require('express').Router();
const gods = require('./gods.js');

// The princiapl path
router.get('/', (req, res) => {
  res.json({ 'info': 'Welcome to gods API!' });
});

// Use the gods route
router.use('/gods', gods);

// Export teh principal outer using in the app.js
module.exports = router;
