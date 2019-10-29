var mysql = require('mysql')

let dbConnectionService

switch (process.env.NODE_ENV) {
  case 'production':
    // TODO: Set up production config
    dbConnectionService = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'react',
      password: 'react',
      database: 'react',
      insecureAuth: true
    })
    break
  default:
    dbConnectionService = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'react',
      password: 'react',
      database: 'react',
      insecureAuth: true
    })
}

dbConnectionService.connect()

module.exports = dbConnectionService
