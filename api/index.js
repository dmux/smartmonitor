const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const compression = require('compression')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const jwks = require('jwks-rsa')
const { expressjwt: jwt } = require('express-jwt')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const ping = require('./routes/ping')
const users = require('./routes/users')
const devices = require('./routes/devices')
const data = require('./routes/data')
const settings = require('./routes/settings')
const processing = require('./routes/processing')

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',') || ''

const unlessPaths =
  process.env.NODE_ENV === 'production'
    ? {
        path: [
          {
            url: /^\/api\/test/,
            methods: ['GET'],
          },
          {
            url: /^\/api\/processing\/device\/status/,
            methods: ['PATCH'],
          },
          {
            url: /^\/api\/processing\/data/,
            methods: ['POST'],
          },
        ],
      }
    : {
        path: [
          {
            url: /^\/api/,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          },
          {
            url: /^\/api\/test/,
            methods: ['GET'],
          },
          {
            url: /^\/api\/docs/,
            methods: ['GET'],
          },
        ],
      }

const app = express()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URL)
  } catch (err) {}
}

connectDB()

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())
app.use(Sentry.Handlers.errorHandler())

app.set('views', './api/views')
app.set('view engine', 'pug')

app.disable('x-powered-by')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
)

app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000,
      rateLimit: true,
      jwksRequestsPerMinute: 25,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
    credentialsRequired: false,
    ignoreExpiration: true,
  }).unless(unlessPaths)
)

app.use(compression())
app.use(helmet({ expectCt: false }))
app.use(express.json())
app.use(cors({ origin: allowedOrigins }))

app.use(ping)
app.use(users)
app.use(devices)
app.use(data)
app.use(settings)
app.use(processing)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Scheduler to run every day at midnight
cron.schedule('00 00 * * *', async () => {
  // console.log('Running daily job')
})

// Scheduler to run every day at midnight
cron.schedule('06 00 * * *', async () => {
  // console.log('Running daily job')
})

// Scheduler to run every hour
cron.schedule('0 * * * *', async () => {
  // console.log('Running hourly job')
})

// Scheduler to run 5 minutes
cron.schedule('*/5 * * * *', async () => {
  // console.log('Running 5 minutes job')
})

// Scheduler to run every minute
cron.schedule('* * * * * *', async () => {
  // console.log('Running minute job')
})

module.exports = app
