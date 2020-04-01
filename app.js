// config contains env variables
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const poemsRouter = require('./controllers/poemsRouter')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to server')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
    })  
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)    
  })


// once we're connected to db we take in our middleware
app.use(cors())
// app.use(express.static('build'))
app.use(bodyParser.json())
// app.use(middleware.requestLogger)

app.use('/api/poems', poemsRouter)

// error handler is always last, preceded by unknownEndpoint
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app