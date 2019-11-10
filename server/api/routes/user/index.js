var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router.route('/register').post(controller.user.register)

  router.route('/login').post(controller.user.login)

  return router
}
