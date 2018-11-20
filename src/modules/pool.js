const pool = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;

const user = process.env.PG_USER || '';
const password = process.env.PG_PASSWORD || '';
const database = process.env.PG_DB || 'postgres';
const host = process.env.PG_HOST || 'localhost';
const port = process.env.PG_PORT || '5432';

const config = pool({ user, password, database, host, port });

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
  };

  return functions[type] || functions['default'];
}

module.exports = { query };