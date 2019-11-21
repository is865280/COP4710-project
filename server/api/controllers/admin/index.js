const db = require('../../../api/services/dbConnectionService')


exports.isAdmin = (req, res) => {
  db.query('SELECT EXISTS(SELECT * FROM admin WHERE user_id = ?)', req.user.id, (err, back) => {
    if (err) res.send(err)
    res.send({ isAdmin: Object.values(back[0])[0] })
  })
}

exports.isAdminOf = (req, res) => {
  db.query('SELECT EXISTS(SELECT * FROM admin WHERE user_id = ? AND RSO_id = ?)', [req.user.id, req.params.rso_id], (err, back) => {
    if (err) res.send(err)
    res.send({ isAdmin: Object.values(back[0])[0] })
  })
}

exports.getRSOs = (req, res) => {
  db.query(`SELECT A.id, A.RSO_id, R.name
  FROM admin AS A, RSO AS R 
  WHERE A.user_id = ? AND A.RSO_id = R.id`,
    [req.user.id], (err, back) => {
      if (err) res.send(err)
      res.send(back)
    })
}
