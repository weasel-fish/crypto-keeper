let pg = require('pg');

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

const { Pool } = require('pg');

const devConfig = {
  user: 'kyleermentrout',
  host: 'localhost',
  database: 'crypto_keeper_dev',
  port: 5432
}

const prodConfig = {
  connectionString : process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
}

export const pool = new Pool(process.env.NODE_ENV === 'production' ? prodConfig : devConfig);