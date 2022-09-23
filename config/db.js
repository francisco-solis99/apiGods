const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite://db.sqlite'); //init an instance of Sequelize

module.exports = sequelize;
