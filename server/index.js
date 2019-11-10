var express = require('express')
var config = require('../config')
var routes = require('./api/routes')
var db = require('./api/services/dbConnectionService')

var app = express()

app.use(express.static('client/build'))

require('./middleware')(app)
app.use(routes())

// TODO: Remove this.
// Example: GET localhost/locations will print all rows received from the
// database to the console.
app.get('/locations', function (req, res) {
  const db = require('./api/services/dbConnectionService')
  db.query('SELECT * FROM location', (error, rows) => {
    if (error) throw error

    res.send(rows)
  })
})

app.get('/test', (req, res) => {
  db.query('SELECT * FROM admin WHERE user_id = 3 AND RSO_id = ?', [undefined], (err, resTest) => {
    if (err) send(err)
    console.log(resTest)
    if (resTest[0]) console.log(resTest[0])
    res.send(resTest)
  })
})

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
