var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const db = require('../../../api/services/dbConnectionService')

exports.register = (req, res) => {
  var hash_password = bcrypt.hashSync(req.body.password, 10)

  var newUser = {
    username: req.body.username,
    email: req.body.email,
    university_id: req.body.university_id,
    hash_password: hash_password
  }
  db.query('INSERT INTO users SET ?', newUser, (err, back) => {
    if (err) res.send(err)

    res.send(back)
  })
}

exports.login = (req, res) => {
  db.query(
    'SELECT * FROM users WHERE username = ?',
    req.body.username,
    (err, user) => {
      if (err) res.send(err)
      if (!user) {
        res.status(401).json({ message: 'Incorect username!' })
      } else if (
        !bcrypt.compareSync(req.body.password, user[0].hash_password)
      ) {
        res.status(401).json({ message: 'Incorect password' })
      } else {
        return res.json({
          token: jwt.sign(
            { username: user[0].username, id: user[0].id },
            'knapsack'
          )
        })
      }
    }
  )
}

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}
