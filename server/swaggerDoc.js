var swaggerUI = require('swagger-ui-express')
var swaggerJsDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Event app',
      version: '1.0.0'
    }
  },
  explorer: true,
  // Path to the API docs
  apis: ['server/*.yaml']
}

const specs = swaggerJsDoc(options)

module.exports = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}
