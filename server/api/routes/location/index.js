var router = require('express').Router()
var controller = require('../../controllers')
var loginRequired = require('../../controllers/user').loginRequired

module.exports = () => {

  router.route('/')
    .get(controller.location.getALL)
    .post(controller.location.addNew)


  return router
}
