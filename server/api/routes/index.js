var router = require('express').Router()
var userRoute = require('./user')
var locationRoute = require('./location')
var universityRoute = require('./university')
var rsoRoute = require('./rso')
var eventRoute = require('./event')
var commentsRouter = require('./comments')

module.exports = () => {
    router.use('/user', userRoute())
    router.use('/location', locationRoute())
    router.use('/university', universityRoute())
    router.use('/rso', rsoRoute())
    router.use('/event', eventRoute())
    router.use('/comments', commentsRouter())

    return router
}
