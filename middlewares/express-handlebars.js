const { engine } = require('express-handlebars')

const helpers = require('../helpers/handlebars-helpers.js')

module.exports = {
  handlebars: engine({ extname: '.hbs', helpers })
}
