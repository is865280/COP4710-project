const db = require('../../../api/services/dbConnectionService')

exports.addNew = (req, res) => {
  var newLocation = {
    name: req.body.location.name,
    address: req.body.location.address,
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude
  }
  db.query('INSERT INTO location SET ?', newLocation, (err, back) => {
    if (err) res.send(err)

    res.send(back)
  })
}

exports.getALL = (req, res) => {
  db.query('SELECT * FROM location', (err, back) => {
    if (err) res.send(err)

    res.send(back)
  })
}
