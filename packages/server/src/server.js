import express from 'express'
import dotenv from 'dotenv'
import settings from '../../../settings'

dotenv.config()
const app = express()
const __PORT__ = process.env.PORT || settings.app.server_port


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(__PORT__, () => {
  console.log(`Server ready at http://localhost:${__PORT__}`)
})