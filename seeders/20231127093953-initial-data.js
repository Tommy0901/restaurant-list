'use strict'

/** @type {import('sequelize-cli').Migration} */
const { results: restaurants } = require('../public/jsons/restaurants.json')
restaurants.forEach(restaurant => {
  delete restaurant.id
  // restaurant.created_at = new Date()
  // restaurant.updated_at = new Date()
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', restaurants)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
}
