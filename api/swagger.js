const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Smart Monitor APIs',
    description: 'Estrututa de APIs da plataforma Smart Monitor. 🚀',
  },
  host: 'localhost:3000',
  schemes: ['https'],
  basePath: '/api',
}

const outputFile = './api/swagger_output.json'
const endpointsFiles = [
  './api/routes/ping.js',
  './api/routes/users.js',
  './api/routes/devices.js',
  './api/routes/data.js',
  './api/routes/settings.js',
  './api/routes/processing.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc)
