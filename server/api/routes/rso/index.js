var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router.route('/')
    .post(loginRequired, controller.rso.addNew)
    .get(controller.rso.getAll)
  router.route('/join')
    .post(loginRequired, controller.rso.joinRSO)
    .delete(loginRequired, controller.rso.leaveRSO)
  router.route('/in/:rso_id')
    .get(loginRequired, controller.rso.isMember)
  router.route('/info/:rso_id')
    .get(controller.rso.getById)



  return router
}
