const { query }= require('../modules/pool');
const table = 'players';

const Player = {
  create: async function({ first_name, last_name, rating, handedness, created_by }) {
    // Check if user is trying to create an already existing player
    const existingPlayers = await query(`SELECT * FROM ${ table } WHERE first_name = $1 AND last_name = $2`, [first_name, last_name]);
    if (existingPlayers.length > 0) {
      throw new Error('Player already exists!');
    }
    const player = query(`INSERT INTO ${ table } (first_name, last_name, rating, handedness, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, handedness, rating, created_by`, [first_name, last_name, rating, handedness, created_by]);
    return player;
  },

  remove: async function() {
    await query(`DELETE FROM ${ table }`);
  }
};

module.exports = Player;
