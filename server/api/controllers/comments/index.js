const db = require('../../../api/services/dbConnectionService')

exports.addNew = (req, res) => {
  var newComment = {
    rating: req.body.rating,
    text: req.body.text,
    event_id: req.body.event_id,
    created_by: req.user.id
  }
  db.query('INSERT INTO comments SET ?', newComment, (err, resCom) => {
    if (err) res.send(err)

    res.send(resCom)
  })
}

exports.getComments = (req, res) => {
  db.query(
    `SELECT C.id, C.rating, C.text, U.username, C.created_by 
    FROM comments AS C, users AS U 
    WHERE C.event_id = ? AND C.created_by = U.id
    ORDER BY  UNIX_TIMESTAMP(C.date_created) DESC`,
    [req.params.event_id],
    (err, resComs) => {
      if (err) res.send(err)

      res.send(resComs)
    }
  )
}

exports.updateById = (req, res) => {
  var updateComment = {
    rating: req.body.rating,
    text: req.body.text,
  }
  db.query(
    'UPDATE comments SET ? WHERE id = ? AND created_by = ?', [updateComment, req.body.comment_id, req.user.id],
    (err, resComs) => {
      if (err) res.send(err)

      res.send(resComs)
    }
  )
}

exports.deleteById = (req, res) => {
  var updateComment = {
    rating: req.body.rating,
    text: req.body.text,
  }
  db.query(
    'DELETE FROM comments WHERE id = ?', req.body.comment_id,
    (err, resComs) => {
      if (err) res.send(err)

      res.send(resComs)
    }
  )
}
