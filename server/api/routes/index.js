var router = require('express').Router()
var userRoute = require('./user')
var locationRoute = require('./location')
var universityRoute = require('./university')
var rsoRoute = require('./rso')
var eventRoute = require('./event')
var commentsRouter = require('./comments')
var adminRouter = require('./admin')
var superAdminRouter = require('./superAdmin')

module.exports = () => {
  router.use('/user', userRoute())
  router.use('/location', locationRoute())
  router.use('/university', universityRoute())
  router.use('/rso', rsoRoute())
  router.use('/event', eventRoute())
  router.use('/comments', commentsRouter())
  router.use('/admin', adminRouter())
  router.use('/superAdmin', superAdminRouter())
  return router
}
