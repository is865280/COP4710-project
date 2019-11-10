var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(loginRequired, controller.event.getEventFeed)
    .post(loginRequired, controller.event.addNew)
  router
    .route('/approve_public')
    .patch(loginRequired, controller.event.approvePublic)
  router
    .route('/approve_private')
    .patch(loginRequired, controller.event.approvePrivate)

  return router
}
