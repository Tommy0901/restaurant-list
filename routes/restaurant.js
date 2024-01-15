const express = require('express')
const router = express.Router()

const { getRestaurant, editRestaurant, putRestaurant, deleteRestaurant } = require('../controllers')

router.get('/:id/edit', editRestaurant)
router.get('/:id', getRestaurant)
router.put('/:id', putRestaurant)
router.delete('/:id', deleteRestaurant)

module.exports = router
