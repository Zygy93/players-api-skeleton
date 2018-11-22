const { query } = require('../modules/pool'); //The query froms from the database pool from the parameterized query
const table = 'users'; //This is were the data is stored

const User = {

  create: async ({ first_name, last_name, email, password}) => {
    const existingUser = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    if (existingUser.length > 0) {
      throw new Error('User exists!');
    }
    const user = await query(`INSERT INTO ${ table } (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email`, [first_name, last_name, email, password]);
    return user;
  }, // This query creates the user

  remove: async () => {
    await query(`DELETE FROM ${ table }`);
  }, // This query deletes the user from the table

  findUserByEmail: async (email) => {
    const users = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    return users[0]; // This query finds the user by email
  },
  updateUser: async (first_name, last_name, email) => {
    const updateUser = await query(`UPDATE ${ table } SET (first_name, last_name) = ($1, $2) WHERE email = $3 RETURNING first_name, last_name, id`, [first_name, last_name, email]);
    return updateUser[0]; // This query updates the first and last name for a user
  }

};

module.exports = User;
//Exports the User object so that it can be used in the Index.js