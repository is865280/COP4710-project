var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {
  router
    .route('/')
    .get(loginRequired, controller.superAdmin.isSuperAdmin)
  router.route('/:university_id')
    .get(loginRequired, controller.superAdmin.isSuperAdminOf)
  return router
}