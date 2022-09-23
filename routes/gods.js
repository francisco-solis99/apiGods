const router = require('express').Router();
const {
  createGod,
  getGod,
  getGods,
  updateGod,
  deleteGod
} = require('../controllers/gods.js')

// Router routes definition
router.get('/', getGods);
router.get('/:id', getGod);
router.post('/', createGod);
router.patch('/:id', updateGod);
router.delete('/:id', deleteGod);

module.exports = router;
