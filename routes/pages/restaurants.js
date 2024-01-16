const express = require('express')
const router = express.Router()

const { getRestaurants, newRestaurant, postRestaurant } = require('../../controllers')

router.get('/new', newRestaurant)
router.get('/', getRestaurants)
router.post('/', postRestaurant)

module.exports = router
