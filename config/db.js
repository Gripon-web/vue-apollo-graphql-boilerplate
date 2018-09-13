require('dotenv').config()
// const fs = require('fs');

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_dev`,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    pool: pool,
    operatorsAliases: false

  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false

  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    }
  }
}
