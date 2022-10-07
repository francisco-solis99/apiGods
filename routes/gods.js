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
/**
 * @swagger
 * /gods/:
 *  get:
 *      summary: Gods Available
 *      description: Returns a gods list
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *            description: All the available gods
 *            type: json
 */
router.get('/', getGods); //add the authorization for the jwt token

router.get('/:id', getGod);

/**
 * @swagger
 * /gods/:
 *  post:
 *      summary: Cread a good
 *      description: Craete a new god
 *      security:
 *        - BearerAuth: [admin]
 *      parameters:
 *        -in: body
 *        name: Name of teh god
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *            description: Created correctly
 *            type: json
 *        401:
 *            description: Sin login
 *            type: json
 *        403:
 *            description: Unathorized
 *            type: json
 *
 */
router.post('/', [passport.authenticate('bearer', { session: false, assignProperty: 'user' }), auth.required], createGod);

router.patch('/:id', [auth.required, auth.isAdmin], updateGod);

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
