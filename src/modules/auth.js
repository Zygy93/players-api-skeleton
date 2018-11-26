const jwt = require('express-jwt');
const { sign } = require('jsonwebtoken'); // This creates the token being used

const secret = process.env.JWT_SECRET || 'secret';

const options = {
  secret
};

function signToken(userId) {
  return sign({ userId, permissions: 'admin' }, secret);
}
// Attaches the userId to the sign token and giving admin authorization

module.exports = { jwt: jwt(options).unless({ path: ['/api/user', '/api/login', /\/api\/user\/\d*/] }), signToken };
// Regular expressions are used to perform pattern-matching and "search-and-replace" functions on text. IN this case,
// We are finding the API UserId
// Exporting the JWT
