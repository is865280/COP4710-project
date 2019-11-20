var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(controller.comments.getComments)
    .post(loginRequired, controller.comments.addNew)
    .patch(loginRequired, controller.comments.updateById)
    .delete(loginRequired, controller.comments.deleteById)

  return router
}