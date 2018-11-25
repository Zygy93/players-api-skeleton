const pool = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;

const user = process.env.PG_USER || '';
const password = process.env.PG_PASSWORD || '';
const database = process.env.PG_DB || 'postgres'; // Name of the database I was using
const host = process.env.PG_HOST || 'localhost'; // Server hosting the postgres database
const port = process.env.PG_PORT || '5432'; // env var: PGPORT
// Configurations to use postgres SQL. This can be changed between each user

const config = pool({ user, password, database, host, port });
// This creates the pool that will be shared by all other modules

async function query(query, parameters) {
  const findQuery = getQuery(query);
  const queue = parameters ? new PQ(query, parameters) : query;
  return await findQuery(queue);
}
// Where we get our query
function getQuery(query) {
  const array = query.split(' ');
  // Split query by space and get first element for type
  const type = array[0];

  //These are the types of queries we are using
  const functions = {
    'SELECT': config.any,
    'INSERT': config.one,
    'default': config.query
  };


  return functions[type] || functions['default'];
}

module.exports = { query };
//Exports the query to be used the routes