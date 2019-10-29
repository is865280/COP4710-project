var express = require('express')
var config = require('../config')

var app = express()

app.use(express.static('client/build'))

// TODO: Remove this.
// Example: GET localhost/locations will print all rows received from the
// database to the console.
app.get('/locations', function(req, res) {
  const db = require('./api/services/dbConnectionService')
  db.query('SELECT * FROM location', (error, rows) => {
    if (error) throw error

    res.send(rows)
  })
})

const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
