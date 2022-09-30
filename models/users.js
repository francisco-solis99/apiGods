
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken'); //library for get a jwt
const secret = require('../config/secret.js');



const User = sequelize.define('User', {
  username: {
    type: DataTypes.CHAR(64),
    // Validate the username
    allowNull: false,
    unique: true,
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
    // we can use hooks as function to  make allowNull as false
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

User.createPassword = (plainText) => {
  const salt = crypto.randomBytes(16).toString('hex'); //create the random salt and save it as hexadecimal
  const hash = crypto.pbkdf2Sync(plainText, salt, 10000, 512, 'sha512').toString('hex'); //plaintext, teh salt, the number of iterations, the size oof teh key
  return { salt, hash }
}

User.validatePassword = (password, userSalt, userHash) => {
  const hash = crypto.pbkdf2Sync(password, userSalt, 10000, 512, 'sha512').toString('hex');
  return userHash === hash;
}

// For teh credit card
// User.encryptCard = (cardText) => {
//   // const cardEncrypted = crypto.pbkdf2Sync(plat, )
// }

// Method to generate the jwt or the identification in the API
User.generateJWT = (user) => {
  const today = new Date();
  const expirationDate = new Date(today); //when it expires in 60 days
  expirationDate.setDate(today.getDate() + 60);

  // Sign the jwt
  return jwt.sign({
    user: user.username,
    exp: parseInt(expirationDate.getTime() / 1000) //segundos
  }, secret);
}


module.exports = User;
