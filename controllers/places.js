const Place = require('../models/places.js');


// Create a new place
function createPlace(req, res) {
  const body = req.body; //get the body of teh request (POST)
  Place.create(body)
    .then(place => {
      res.status(201).json(place);
    });
}


// Get a place
async function getPlace(req, res) {
  const id = req.params.id;
  const placeFinded = await Place.findByPk(id);
  res.status(200).json(placeFinded);
}


// Get all the places (here is the pagination if we want it)
async function getPlaces(req, res) {
  const id = req.params.id;
  const allPlaces = await Place.findAll(id);
  res.status(200).json(allPlaces);
}


// Update a Place
async function updatePlace(req, res) {
  const id = req.params.id;
  const place = req.body;
  await Place.update(place, { where: { id } });
  const placeUpdated = await Place.findByPk(id);
  res.status(202).json(placeUpdated);
}

// Delete a place
async function deletePlace(req, res) {
  const id = req.params.id;
  const deleted = await Place.destroy({ where: { id: id } });
  res.status(200).json(deleted)
}


module.exports = {
  createPlace,
  getPlace,
  getPlaces,
  updatePlace,
  deletePlace
};
