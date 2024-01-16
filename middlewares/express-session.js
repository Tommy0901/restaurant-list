if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  session: require('express-session')(
    {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }
  )
}
