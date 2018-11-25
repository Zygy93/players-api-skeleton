const { query } = require('../modules/pool'); //The query froms from the database pool from the parameterized query
const table = 'users'; //This is were the data is stored

const User = {
  // This query creates the user
  create: async ({ first_name, last_name, email, password}) => {
    const existingUser = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    // Selects from the Users table where it matches the email
    if (existingUser.length > 0) {
      //Checks to see if there is already an existing user
      throw new Error('User exists!');
    }
    const user = await query(`INSERT INTO ${ table } (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email`, [first_name, last_name, email, password]);
    // Inserts the user information into that database
    return user;
  }, // End Query

  // This query deletes the user from the table
  remove: async () => {
    await query(`DELETE FROM ${ table }`);
  }, // End Query

  // This query finds the user by email
  findUserByEmail: async (email) => {
    const users = await query(`SELECT * FROM ${ table } WHERE email = $1`, [email]);
    // Selects from the Users table where it matches the email
    return users[0];
    // Returns the user in an array
  }, // End Query

  // This query updates the first and last name for a user
  updateUser: async (first_name, last_name, userId) => {
    const user = await query(`UPDATE ${ table } SET first_name = $1, last_name =$2 WHERE id = $3 RETURNING first_name, last_name, id`, [first_name, last_name, userId]);
    return user[0];
    // Returns the user in an array
  } // End Query

};

module.exports = User;
//Exports the User object so that it can be used in the Index.js