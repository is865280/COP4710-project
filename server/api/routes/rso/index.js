var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

  router.route('/')
    .post(loginRequired, controller.rso.addNew)
  router.route('/join')
    .post(loginRequired, controller.rso.joinRSO)
    .delete(loginRequired, controller.rso.leaveRSO)


  return router
}
