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
});// End POST request

// Handles login form authenticate/login POST
router.post('/login', validateLogin, async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;
  // Check if user exists
  const user = await User.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false });
    // If it's not the correct user, it sends a failes status
  }
  const hash = user.password;
  const isValidPassword = await bcrypt.compare(textPassword, hash);
  // Compares the plaintext password with stored hash
  if (!isValidPassword) {
    return res.status(401).json({ success: false });
    // If the password is incorrect, it sends a failed status
  }
  const token = signToken(user.id);
  //Issues the token
  delete user.password;
  //Removes the password from the API
  res.status(200).json({ success: true, user, token });
  //Send us a successful respoonse, user and token
});//End POST request

// Handles the put request where we update the user's first and last name
router.put('/user/:userId', async (req, res) => {
  let user;
  try {
    user = await User.updateUser(req.body.first_name, req.body.last_name, req.params.userId);
    //We're sending the first_name, last_name, and userID to update the user
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
    //returns error
  }
  res.status(200).json({ success: true, user });
  //Sends us back the User's updated information
});//End Put Request

module.exports = router;
//Exports user router