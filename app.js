const express = require('express');
const sequelize = require('./config/db.js'); //get sequelize
const routes = require('./routes/index.js');

// Ask for the optional middleware
const auth = require('./config/auth.js');

const app = express();
app.use(express.json()); //using the middleware to convert the respons in a valid JS object


// Ask for the optional middleware before we use the routes
app.use(auth.optional); // global middle ware
app.use('/', routes); // add the routes


try {
  sequelize.authenticate();
  sequelize.sync();
  console.log('Connected to DB');
} catch (error) {
  console.log('Unable to connect to DB: ', error);
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});



// Packges foor Security => crypto,
