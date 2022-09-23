const router = require('express').Router();
const {
  createPlace,
  getPlace,
  getPlaces,
  updatePlace,
  deletePlace
} = require('../controllers/places.js')

// Router routes definition
router.get('/', getPlaces);
router.get('/:id', getPlace);
router.post('/', createPlace);
router.patch('/:id', updatePlace);
router.delete('/:id', deletePlace);

module.exports = router;
