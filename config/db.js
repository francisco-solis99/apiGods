const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env['DATABASE_URL']); //init an instance of Sequelize

module.exports = sequelize;
