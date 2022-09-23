
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const God = require('./gods.js');

const Place = sequelize.define('Place', {
  name: {
    type: DataTypes.CHAR(64),
  },
  description: {
    type: DataTypes.TEXT,
  }
});

// Adding the relationship 1 to many
Place.hasMany(God);
God.belongsTo(Place);

module.exports = Place;
