const db = require('../../../api/services/dbConnectionService')


exports.addNew = (req, res) => {

  var newLocation = {
    name: req.body.location.name, address: req.body.location.address,
    latitude: req.body.location.latitude, longitude: req.body.location.longitude
  }

  db.query('INSERT INTO location SET ?', newLocation, (err, resLoc) => {
    if (err) res.send(err)
    var newUniversity = {
      name: req.body.name, location_id: resLoc.insertId,
      description: req.body.description, num_students: 0, pictures: req.body.pictures
    }
    db.query('INSERT INTO university SET ?', newUniversity, (err, resUni) => {
      if (err) res.send(err)
      var newSuperAdmin = {
        user_id: req.user.id, university_id: resUni.insertId
      }
      db.query('INSERT INTO super_admin SET ?', newSuperAdmin, (err, resSA) => {
        if (err) res.send(err)
        res.send(resSA)
      })
    })
  })
}


exports.getAll = (req, res) => {
  db.query('SELECT * FROM university', (err, back) => {
    if (err) res.send(err)

    res.send(back)
  })
}