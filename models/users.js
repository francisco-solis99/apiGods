
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.CHAR(64),
    // Validate the username
    allowNull: false,
    unique: false,
    validate: {
      isLowercase: true,
      is: /^[a-z-0-9_-]+$/
    }
  },
  name: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  lastname: {
    type: DataTypes.CHAR(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  passwordHash: {
    type: DataTypes.CHAR(64),
    // allowNull: false,
  },
  passwordSalt: {
    type: DataTypes.CHAR(64),
    // allowNull: false,
  },
  card: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    validate: {
      isCreditCard: true,
    }
  },
  typeCard: { type: DataTypes.CHAR(64) }
});

module.exports = User;
