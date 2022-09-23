const God = require('../models/gods.js');


// Create a new god
function createGod(req, res) {
  const body = req.body; //get the body of teh request (POST)
  God.create(body)
    .then(god => {
      console.log(god);
      res.status(201).json(god);
    });

  /* With async await
    const god = God.create(god);
    res.status(201).json(god)  */
}


// Get a God
async function getGod(req, res) {
  const id = req.params.id;
  const godFinded = await God.findByPk(id);
  res.status(200).json(godFinded);
}


// Get all the gods (here is the pagination if we want it)
async function getGods(req, res) {
  const id = req.params.id;
  const allGods = await God.findAll(id);
  res.status(200).json(allGods);
}


// Update a god
async function updateGod(req, res) {
  const id = req.params.id;
  const god = req.body;
  const update = await God.update(god, { where: { id } });
  const godUpdated = await God.findByPk(id);
  res.status(202).json(godUpdated);
}

// Delete a god
async function deleteGod(req, res) {
  const id = req.params.id;
  const deleted = await God.destroy({ where: { id: id } });
  res.status(200).json(deleted)
}


module.exports = {
  createGod,
  getGod,
  getGods,
  updateGod,
  deleteGod
};
