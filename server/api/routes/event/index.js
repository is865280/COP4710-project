var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(loginRequired, controller.event.getEventFeed)
    .post(loginRequired, controller.event.addNew)
  router
    .route('/public')
    .get(loginRequired, controller.event.getUnapprovePublic)
    .patch(loginRequired, controller.event.approvePublic)
  router
    .route('/private')
    .get(loginRequired, controller.event.getUnapprovePrivate)
    .patch(loginRequired, controller.event.approvePrivate)

  return router
}
