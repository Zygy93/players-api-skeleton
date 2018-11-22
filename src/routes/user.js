const { Router } = require('express');
const bcrypt = require('bcrypt');
const { signToken } = require('../modules/auth');
const User = require('../models/user');
const { validateUser, validateLogin } = require('../modules/validate');
const router = new Router();

// Handles POST request with new user data
router.post('/user', validateUser, async (req, res) => {
  const password = req.body.password;
  // Set plaintext password to hash before storing
  req.body.password = await bcrypt.hash(password, 10);
  // This determines how secure the salt should be
  let user;
  try {
    user = await User.create(req.body); // Send back user object from the session to validate
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
  }
  // Issue token
  const token = signToken(user.id);
  res.status(201).json({ success: true, user, token });
});

// Handles login form authenticate/login POST
router.post('/login', validateLogin, async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;
  // Check if user exists
  const user = await User.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false });
  }
  const hash = user.password;
  // Compare plaintext password with stored hash
  const isValidPassword = await bcrypt.compare(textPassword, hash);
  if (!isValidPassword) {
    return res.status(401).json({ success: false });
  }
  // Issue token
  const token = signToken(user.id);
  // Remove password for response
  delete user.password;
  res.status(200).json({ success: true, user, token });
});

router.put('/user/:userId', async (req, res) => {
  let updatedUser;
  console.log(req.body);
  try {
    updatedUser = await User.updateUser(req.body); // Send back user object from the session to validate
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
  }
  res.status(201).json({ success: true, updatedUser });
});



module.exports = router;