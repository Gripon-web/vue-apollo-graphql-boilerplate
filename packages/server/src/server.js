import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'
import http from 'http'

import app from './app'
import apolloServer from './graphql'
import settings from '../../../settings'

dotenv.config()
const __PORT__ = process.env.PORT || settings.app.server_port

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'example.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}
const environment = process.env.NODE_ENV || 'production'
const config = configurations[environment]

apolloServer.applyMiddleware({ app })

// Create the HTTPS or HTTP server, per configuration
let server
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root.
  // Make sure the files are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
    },
    app
  )
} else {
  server = http.createServer(app)
}

server.listen({ port: __PORT__ }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://localhost:${__PORT__}/graphql`
  )
)
