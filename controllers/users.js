const User = require('../models/users.js');

async function signUp(req, res) {
  const body = req.body;
  try {
    //create the user
    const user = await User.create(body);
    // create the password and save
    const { salt, hash } = User.createPassword(body['password']);
    user.passwordSalt = salt;
    user.passwordHash = hash;
    // maybe more validations to be sure there is a strong password
    // save the changes
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(err.name)) {
      return res.status(400).json({
        error: err.errors.map(e => e.message)
      })
    }
    else {
      console.log(err.name);
    }
  }
}

// Function for validate the password simulating a login
async function login(req, res) {
  const body = req.body;
  const user = await User.findOne({ where: { username: body['username'] } });
  if (!user) return res.status(404).json({ error: 'User Not Found' });

  // We need to return the JWT token when he or she is welcomed
  if (User.validatePassword(body['password'], user.passwordSalt, user.passwordHash)) {

    return res.status(200).json({
      user: user.username,
      email: user.email,
      token: User.generateJWT(user)
    });
  }
  return res.status(400).json({
    err: 'Something wrong in teh crediantials'
  });
}

module.exports = { signUp, login };
