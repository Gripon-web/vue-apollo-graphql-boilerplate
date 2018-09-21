import express from 'express'
import modules from './modules'

const app = express()

for (const applyBeforeware of modules.beforewares) {
  applyBeforeware(app);
}

for (const applyMiddleware of modules.middlewares) {
  applyMiddleware(app);
}

app.get('/', function (req, res) {
  res.send('Hello World')
})

export default app