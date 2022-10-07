const router = require('express').Router();
const {
  createGod,
  getGod,
  getGods,
  updateGod,
  deleteGod
} = require('../controllers/gods.js')
const auth = require('../config/auth.js')
// Passport
const passport = require('../config/passport.js');



// Router routes definition
router.get('/', getGods); //add the authorization for the jwt token
router.get('/:id', getGod);
router.post('/', passport.authenticate('local', { session: false }), createGod);
router.patch('/:id', auth.required, updateGod);
router.delete('/:id', auth.isAdmin, deleteGod);

module.exports = router;

/*
Utiliza los middlewares de tal forma, que las vistas de Gods estén protegidas de la siguiente forma:
GET god: Autenticación opcional / Crear nuevo middleware
GET gods: Autenticación opcional / Usar nuevo middleware
PATCH god: Autenticación requerida
CREATE god: Autenticación requerida
DELETE god: Autenticación requerida

*/
