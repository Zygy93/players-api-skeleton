const pgp = require('pg-promise')();
let config = {};

config = {
  user: process.env.PG_USER || null, //env var: PGUSER
  password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
  host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
  port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
  database: process.env.DATABASE_NAME || 'postgres', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

module.exports = new pgp.Pool(config);
