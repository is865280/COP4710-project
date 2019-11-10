var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
const db = require('../api/services/dbConnectionService')

module.exports = app => {
  app.use(bodyParser.json())

  app.use(async (req, res, next) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        'knapsack',
        (err, decode) => {
          req.user = decode
          if (err) req.user = undefined
        }
      )
    } else {
      req.user = undefined
    }
    if (req.user) {
      await db.query(
        'SELECT * FROM users WHERE username = ?',
        req.user.username,
        (err, user) => {
          if (err || !user) req.user = undefined
        }
      )
    }
    next()
  })
}
