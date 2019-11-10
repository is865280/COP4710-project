const db = require('../../../api/services/dbConnectionService')

exports.addNew = (req, res) => {
  var newRSO = {
    name: req.body.name,
    description: req.body.description,
    num_members: 0,
    active: false
  }

  db.query('INSERT INTO RSO SET ?', newRSO, (err, resRSO) => {
    if (err) res.send(err)
    var newAdmin = {
      user_id: req.user.id,
      RSO_id: resRSO.insertId
    }
    db.query('INSERT INTO admin SET ?', newAdmin, (err, resA) => {
      if (err) res.send(err)
      var newMember = {
        user_id: req.user.id,
        RSO_id: resA.insertId
      }
      db.query('INSERT INTO members SET ?', newMember, (err, resMem) => {
        if (err) res.send(err)
        res.send(resMem)
      })
    })
  })
}

exports.joinRSO = (req, res) => {
  var newMember = {
    user_id: req.user.id,
    RSO_id: req.body.rso_id
  }
  db.query('INSERT INTO members SET ?', newMember, (err, resMem) => {
    if (err) res.send(err)
    res.send(resMem)
  })
}

exports.leaveRSO = (req, res) => {
  db.query(
    'DELETE FROM members WHERE user_id = ? AND RSO_id = ?',
    [req.user.id, req.body.rso_id],
    (err, resMem) => {
      if (err) res.send(err)
      res.send(resMem)
    }
  )
}
