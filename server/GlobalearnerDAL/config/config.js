require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify your database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
    port: 40000
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify your database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify your database dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  },
}
