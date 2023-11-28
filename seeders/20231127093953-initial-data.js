"use strict";

/** @type {import('sequelize-cli').Migration} */
const { results: restaurants } = require("../public/jsons/restaurants.json");
restaurants.forEach((restaurant) => {
  delete restaurant.id;
  restaurant.createdAt = new Date();
  restaurant.updatedAt = new Date();
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("restaurants", restaurants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null);
  },
};
