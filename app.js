const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')

const messageHandler = require('./middlewares/message-handler')
const helpers = require('./helpers/handlebars-helpers.js')
const router = require('./routes')

const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs', helpers }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(messageHandler)
app.use(router) // 將 request 導入路由器

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
