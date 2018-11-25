
const { check, validationResult } = require('express-validator/check');
//express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizes functions
//The exists() method only checks that one of the items in the array
//The trim() method removes whitespace from both sides of a string
// Check validates the input and report any errors before creating the user:

//Validates a User
const validateUser = [
  check('first_name').exists().trim(),
  check('last_name').exists().trim(),
  check('email').exists().isEmail(),
  check('password').exists(),
  check('confirm_password')
    .exists()
    .custom((val, { req }) => val === req.body.password),
  isValid
];

//Validates a player
const validatePlayer = [
  check('first_name').exists().trim(),
  check('last_name').exists().trim(),
  check('rating').exists(),
  check('handedness').exists(),
  isValid
];

//Validates a login attempt
const validateLogin = [
  check('email').exists().trim(),
  check('password').exists().trim(),
  isValid
];

//Makes the validation request valid
function isValid(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json({ success: false });
  }
  next();
}

module.exports = { validateUser, validatePlayer, validateLogin };
//Export validation