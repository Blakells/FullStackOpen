const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
   // logger.info("Body: ", res)
    logger.info('---')
    next()
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({error: "malformatted ID"})
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({error: 'Validation Error'})
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }
    logger.error(error.message)
    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7)
    }
    next()
  }


module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
    tokenExtractor
}