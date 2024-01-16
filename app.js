const express = require('express')

const { flash } = require('./middlewares/connect-flash')
const { session } = require('./middlewares/express-session.js')
const { handlebars } = require('./middlewares/express-handlebars.js')
const { methodOverride } = require('./middlewares/method-override')
const { messageHandler } = require('./middlewares/message-handler')
const router = require('./routes')

const app = express()
const port = 3000

app.engine('.hbs', handlebars)
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(
  express.json(),
  express.static('public'),
  express.urlencoded({ extended: true }),
  methodOverride,
  session,
  flash,
  messageHandler,
  router // 將 request 導入路由器
)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
