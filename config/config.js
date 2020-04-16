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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "DB": {
      "SYNC_ALTER": false,
      "SYNC_FORCE": false
    }
  }
}
