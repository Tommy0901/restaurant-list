const express = require('express')
const router = express.Router() // 引入 Express 路由器

const restaurant = require('./pages/restaurant') // 引入 restaurant 路由模組
const restaurants = require('./pages/restaurants') // 引入 restaurants 路由模組

const { errorHandler } = require('../middlewares/error-handler')

router.use('/restaurant', restaurant) // 設定 restaurant 路由模組
router.use('/restaurants', restaurants) // 設定 restaurants 路由模組

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.use('/', errorHandler)

module.exports = router
