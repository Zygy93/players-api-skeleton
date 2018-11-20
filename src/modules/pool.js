const pool = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;

const user = process.env.PG_USER || '';
const password = process.env.PG_PASSWORD || '';
const database = process.env.PG_DB || 'postgres';
const host = process.env.PG_HOST || 'localhost'; // Server hosting the postgres database
const port = process.env.PG_PORT || '5432'; // env var: PGPORT
//Configurations to use postgres SQL

const config = pool({ user, password, database, host, port });
// this creates the pool that will be shared by all other modules

async function query(query, parameters) {
  const findQuery = getQuery(query);
  const queue = parameters ? new PQ(query, parameters) : query;
  return await findQuery(queue);
}

function getQuery(query) {
  const array = query.split(' ');
  const type = array[0];

  const functions = {
    'SELECT': config.any,
    'INSERT': config.one,
    'default': config.query
  };//These are the types of queries we are using

  return functions[type] || functions['default'];
}

module.exports = { query };
//Exports the query to be used the routes