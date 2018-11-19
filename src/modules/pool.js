
const pgp = require('pg-ptomise');

let config = {};
config = {
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  database: 'postgres', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

const pool = new pgp.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;