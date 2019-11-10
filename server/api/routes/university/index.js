var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(controller.university.getAll)
    .post(loginRequired, controller.university.addNew)
  router
    .route('/join')
    .patch(controller.university.join)

  return router
}
