const router = require('express').Router();
const gods = require('./gods.js');
const places = require('./places.js');

// The princiapl path
router.get('/', (req, res) => {
  res.json({ 'info': 'Welcome to gods API!' });
});

// Use the gods route
router.use('/gods', gods);
// Use the places route
router.use('/places', places);

// Export teh principal outer using in the app.js
module.exports = router;
