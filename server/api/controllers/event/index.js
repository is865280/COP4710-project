const db = require('../../../api/services/dbConnectionService')

exports.addNew = (req, res) => {
  var newLocation = {
    name: req.body.location.name,
    address: req.body.location.address,
    latitude: req.body.location.latitude,
    longitude: req.body.location.longitude
  }
  db.query(
    'SELECT * FROM admin WHERE user_id = ?',
    [req.user.id, req.body.rso_id],
    (err, resAdmin) => {
      if (err) res.send(err)
      if (!resAdmin[0]) {
        res.send({ message: 'user is not an admin' })
      }

      var loc_id
      if (!loc_id) {
        db.query('INSERT INTO location SET ?', newLocation, (err, resLoc) => {
          if (err) res.send(err)
          loc_id = resLoc.insertId
          doNext()
        })
      } else
        firstDo = async () => {
          loc_id = req.body.location_id
          doNext()
        }

      var doNext = () => {
        var newEvent = {
          name: req.body.name,
          location_id: loc_id,
          time: req.body.time,
          date: req.body.date,
          category: req.body.category,
          description: req.body.description,
          contact_phone: req.body.contact_phone,
          contact_email: req.body.contact_email
        }
        db.query('INSERT INTO event SET ?', newEvent, (err, resEvent) => {
          if (err) res.send(err)

          switch (req.body.category) {
            case 'rso':
              var table = 'RSO_event'
              var newEventInfo = {
                RSO_id: req.body.rso_id,
                event_id: resEvent.insertId
              }
              break
            case 'public':
              var table = 'public_event'
              var newEventInfo = {
                created_by: resAdmin[0].id,
                event_id: resEvent.insertId
              }
              break
            case 'private':
              var table = 'private_event'
              var newEventInfo = {
                created_by: resAdmin[0].id,
                event_id: resEvent.insertId,
                university_id: req.body.university_id
              }
              break
            default:
              break
          }

          if (!table) res.send({ message: 'Please specify event catagory' })
          db.query(
            'INSERT INTO ?? SET ?',
            [table, newEventInfo],
            (err, resEI) => {
              if (err) res.send(err)
              res.send(resEI)
            }
          )
        })
      }
    }
  )
}
var getAdminId = user_id => {
  db.query(
    'SELECT id FROM admin WHERE user_id = ?',
    user_id,
    (err, resAdmin) => {
      if (err) res.send(err)
    }
  )
}
exports.approvePublic = (req, res) => {
  db.query(
    'SELECT * FROM super_admin WHERE user_id = ?',
    req.user.id,
    (err, resSA) => {
      if (err) res.send(err)
      if (resSA[0]) {
        db.query(
          'UPDATE public_event SET approved_by = ? WHERE event_id = ?',
          [resSA[0].id, req.body.event_id],
          (err, resApp) => {
            if (err) res.send(err)
            res.send(resApp)
          }
        )
      }
    }
  )
}

exports.approvePrivate = (req, res) => {
  db.query(
    'SELECT * FROM super_admin WHERE user_id = ?',
    req.user.id,
    (err, resSA) => {
      if (err) res.send(err)
      if (resSA[0]) {
        db.query(
          'UPDATE private_event SET approved_by = ? WHERE event_id = ?',
          [resSA[0].id, req.body.event_id],
          (err, resApp) => {
            if (err) res.send(err)
            res.send(resApp)
          }
        )
      }
    }
  )
}

exports.getEventFeed = (req, res) => {
  db.query('SELECT university_id FROM users WHERE id = ?', req.user.id, (err, resUniID) => {
    if (err) res.send(err)

    db.query(`SELECT *, DATEDIFF(date, CURDATE()) AS diff FROM event WHERE id IN (
      SELECT event_id FROM RSO_event WHERE RSO_id IN (
        SELECT RSO_id FROM members WHERE user_id = ?
      )
      UNION ALL 
      SELECT event_id FROM private_event WHERE university_id = ? AND approved_by IS NOT NULL
      UNION ALL 
      SELECT event_id FROM public_event WHERE approved_by IS NOT NULL)
      ORDER BY CASE WHEN date IS NULL THEN 1 ELSE 0 END,
      CASE WHEN diff < 0 THEN 1 ELSE 0 END, diff, date, time`,
      [req.user.id, resUniID[0].university_id], (err, resEvents) => {
        if (err) res.send(err)
        res.send(resEvents)
      })
  })
}

exports.getUnapprovePrivate = (req, res) => {
  db.query('SELECT * FROM private_event WHERE approved_by IS NULL', (err, resPri) => {
    if (err) res.send(err)
    res.send(resPri)
  })
}

exports.getUnapprovePublic = (req, res) => {
  db.query('SELECT * FROM public_event WHERE approved_by IS NULL', (err, resPri) => {
    if (err) res.send(err)
    res.send(resPri)
  })
}
