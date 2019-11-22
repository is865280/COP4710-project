const db = require('../../../api/services/dbConnectionService')


exports.isSuperAdmin = (req, res) => {
  console.log(req.body)
  db.query('SELECT EXISTS(SELECT * FROM super_admin WHERE user_id = ?)', req.user.id, (err, back) => {
    if (err) res.send(err)
    console.log(req.body)
    res.send({ isAdmin: Object.values(back[0])[0] })
  })
}

exports.isSuperAdminOf = (req, res) => {
  db.query('SELECT EXISTS(SELECT * FROM super_admin WHERE user_id = ? AND university_id= ?)', [req.user.id, req.params.university_id], (err, back) => {
    if (err) res.send(err)
    res.send({ isAdmin: Object.values(back[0])[0] })
  })
}

