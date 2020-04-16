const path = require('path')

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": path.join(__dirname, '..', 'database_test.sqlite'),
    "dialect": "sqlite",
    "operatorsAliases": false,
    "DB": {
      "SYNC_ALTER": true,
      "SYNC_FORCE": true
    }
  },
  "production": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_NAME || "database_production",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
    "DB": {
      "SYNC_ALTER": false,
      "SYNC_FORCE": false
    }
  }
}
