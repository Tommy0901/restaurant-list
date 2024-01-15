const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

const handlebars = require('handlebars')

handlebars.registerHelper('is_equal', (arg1, arg2) => {
  return arg1 === arg2
})

app.engine('.hbs', engine({ extname: '.hbs' }))
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
app.use(errorHandler)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
