const pgp = require('pg-promise');

const user = process.env.PG_USER || '';
const password = process.env.PG_PASSWORD || '';
const database = process.env.PG_DB || 'postgres';
const host = process.env.PG_HOST || 'localhost';
const port = process.env.PG_PORT || '5432';

const config = pgp({ user, password, database, host, port });

module.exports = new pgp.Pool(config);
