'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {id: 1,name: "Pizza"},
      {id: 2,name: "Specials"},
      {id: 3,name: "Pagnotta"},
      {id: 4,name: "Salads"},
      {id: 5,name: "Combos"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};