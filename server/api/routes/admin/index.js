var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(loginRequired, controller.admin.isAdmin)
  router.route('/rso')
    .get(loginRequired, controller.admin.getRSOs)
  router.route('/:rso_id')
    .get(loginRequired, controller.admin.isAdminOf)
  return router
}