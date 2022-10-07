require('dotenv').config();
require('./config/passport');

const express = require('express');
const sequelize = require('./config/db.js'); //get sequelize
const routes = require('./routes/index.js');
// Swagger
const swaggerOptions = require('./config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Ask for the optional middleware
const auth = require('./config/auth.js');

const app = express();
app.use(express.json()); //using the middleware to convert the respons in a valid JS object


// Ask for the optional middleware before we use the routes
app.use(auth.optional); // global middle ware
app.use('/', routes); // add the routes

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

try {
  sequelize.authenticate();
  sequelize.sync();
  console.log('Connected to DB');
} catch (error) {
  console.log('Unable to connect to DB: ', error);
}


app.listen(process.env['PORT'], () => {
  console.log('Listening on port ' + process.env['PORT']);
});



// Packges foor Security => crypto,
