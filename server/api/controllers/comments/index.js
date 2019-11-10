const db = require('../../../api/services/dbConnectionService')

exports.addNew = (req, res) => {
  var newComment = {
    rating: req.body.rating,
    text: req.body.text,
    event_id: req.body.event_id,
    created_by: req.body.user_id
  }
  db.query('INSERT INTO comments SET ?', newComment, (err, resCom) => {
    if (err) res.send(err)

    res.send(resCom)
  })
}

exports.getComments = (req, res) => {
  db.query(
    'SELECT * FROM comments WHERE event_id = ?',
    req.body.event_id,
    (err, resComs) => {
      if (err) res.send(err)

      res.send(resComs)
    }
  )
}
